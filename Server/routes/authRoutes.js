import passport from "passport";
import express from "express"
import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import Token from "../models/token.js";
import { sendEmail } from "../utils/sendEmail.js";
import { stripe } from "../utils/stripe.js";
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();

//Local Auth

//Register

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: true,
        message: "Email is already registered",
      });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //Stripe customer creation
    const customer = await stripe.customers.create({
      email: email,
    }, {
      apiKey: process.env.STRIPE_KEY,
    });

    // Create new user
    const newUser = new User({ email, password: hashedPassword, provider: "email", stripeCustomerId: customer.id, credits: 0 });
    await newUser.save();
    // Create a verification token for this user
    const token = new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await token.save();
    const verificationUrl = `${process.env.CLIENT_URL}/verify/${newUser._id}/${token.token}`;
    await sendEmail({
      email: newUser.email,
      subject: "Account Verification",
      text: `Please verify your account by clicking the following link: ${verificationUrl}`,
    }).catch(console.error); 
    res.status(201).json({
      error: false,
      message: "Email has been sent to verify your account",
      user: newUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "An error occurred while registering the user",
    });
  }
});

//Login

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (err) throw err;
        if (!user){
            res.status(401).json({
                error: true,
                message: "User failed to authenticate."
            });
        }
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.status(200).json({
                    user: req.user,
                });
            });
        }
    })(req, res, next);    
});


router.get('/getUser', async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
      error: true,
      message: "User failed to authenticate."
  });
});

router.get("/login/success", (req, res) => {
  if (req.user) {
      res.status(200).json({
          user: req.user,
      });
  }else{
      res.status(401).json({
          success: false,
          message: "User failed to authenticate."
      });
  }
});

//Google Auth

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}/app`,
    failureRedirect: "/login/failed"
  })
);

//Logout

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
      console.log("logged out");
      if (err) { return next(err); }
      res.send('done');
  });
});

//Verify

router.get("/:id/verify/:token", async (req, res) => {
  try {
      const { id, token } = req.params;
      const user = await User.findById(id);
      
      if (!user) {
          return res.status(404).json({ message: "User not found" }); 
      }
      if (user.isVerified) {
        return res.status(200).json({ message: "User is verified" });
      }
      console.log("id: ", id, "token: ", token);
      const tempToken = await Token.findOne({
        token: token,
      });
      console.log("tempToken: ", tempToken);
      if (!tempToken) {
        return res.status(404).json({ message: "Invalid Link" }); 
      }
      //updating the user to verified and set credits to 100
      await User.updateOne({ _id: user._id }, { isVerified: true, credits: 100 });
      await Token.deleteOne({ userId: user._id, token: token });
      res.status(200).json({ message: "User verified" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Can't verify the token right now." });
  }
});

//Resend Verification Email
router.post("/resend", async (req, res) => {
    try {
      const {_id} = req.body;
      const user = await User.findById(_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" }); 
      }
      if (user.isVerified) {
        return res.status(400).json({ message: "User is already verified" });
      }
      //Delete the old tokens
      await Token.deleteMany({ userId: user._id });
      const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      const verificationUrl = `${process.env.CLIENT_URL}/verify/${user._id}/${token.token}`;
      await sendEmail({
      email: user.email,
      subject: "Account Verification",
      text: `Please verify your account by clicking the following link: ${verificationUrl}`,
      }).catch(console.error);
      res.status(201).json({
        error: false,
        message: "Email has been sent!",
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Can't resend the email right now." });
    }
});

//Forgot Password

router.post("/forgot-password", async (req, res) => {
    const {email} = req.body;
  try {
      //Find the user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "No user found" });   
      }
      //Delete the old tokens
      await Token.deleteMany({ userId: user._id });
      //Create a new token
      const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      const resetUrl = `${process.env.CLIENT_URL}/login/reset-password/${user._id}/${token.token}`;
      await sendEmail({
        email: user.email,
        subject: "Password Reset",
        text: `Please reset your password by clicking the following link: ${resetUrl}`,
      }).catch(console.error);
      res.status(201).json({
        error: false,
        message: "Email has been sent!",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Can't reset the password right now." });
    }
});

router.post("/reset-password", async (req, res) => {
    const {id, token, password} = req.body;
    try {
      //Find the user
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });   
      }
      //Find the token
      const tempToken = await Token.findOne({
        token: token,
      });
      if (!tempToken) {
        return res.status(404).json({ message: "Invalid Link" }); 
      }
      //Hash the password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      //Update the password
      user.password = hashedPassword;
      await user.save();
      //Delete the token
      Token.deleteOne({ userId: user._id, token: token });
      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Can't reset the password right now." });
    }
});

export default router;