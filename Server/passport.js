import { Strategy } from "passport-google-oauth20";
import passport from "passport";
import User from "./models/user.js";
import PL from "passport-local";
import bcryptjs from "bcryptjs";
import { stripe } from "./utils/stripe.js";
import dotenv from "dotenv";
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;

const localStrategy = PL.Strategy;

passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email }, (err, data) => {
    if (err) throw err;
    if (!data) {
      return done(null, false, { message: "User Doesn't Exist !" });
    }
    bcryptjs.compare(password, data.password, (err, result) => {
      if (err) throw err;
      if (result === true) {
        return done(null, data);
      } else {
        return done(null, false, { message: "Incorrect Password !" });
      }
    })
  })
}));

//GOOGLE OAUTH 2.0

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, callback) {
      try {
        const existingUser = await User.findOne({ email: profile.emails[0].value });
        if (existingUser) {
          return callback(null, existingUser);
        }

        // creating stripe customer
        const customer = await stripe.customers.create({
          email: profile.emails[0].value,
        });

        // creating new user
        console.log(customer.id);

        const user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          provider: "google",
          password: "null",
          stripeCustomerId: customer.id,
          credits: 100,
          isVerified: true,
        });

        // saving new user
        await user.save();
        return callback(null, user);
      } catch (error) {
        return callback(error);
      }
    }
  ));