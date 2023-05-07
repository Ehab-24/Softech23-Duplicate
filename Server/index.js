import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import User from "./models/user.js";
import bodyParser from "body-parser";
import session from "express-session";
import "./passport.js"

import inventoryRoutes from "./routes/inventoryRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 
import wishlistRoutes from "./routes/wishlistRoutes.js";
import botRoutes from "./routes/botRoutes.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

app.use("/subs/webhook", bodyParser.raw({ type: "*/*" }));

app.use(express.urlencoded({ extended: false }));

// app.set('trust proxy', 1);

app.use(
  session({
    secret: "MySecretKey",
    resave: true,
    saveUninitialized: true,
  })
)

app.use(cookieParser());

// Setup Passport

app.use(passport.initialize());
app.use(passport.session());

//Serializing and Deserializing

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, doc) => {
      done(null, doc);
  });
});

//MongoDB connection

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB connected");
});

db.on("error", (error) => {
  console.log(error);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server started on port 4000");
});

//Routes
app.use("/inventory", inventoryRoutes);
app.use("/item", itemRoutes);
app.use("/order", orderRoutes);
app.use("/review", reviewRoutes);
app.use("/auth", authRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/bot", botRoutes);

//Server routes

app.get("/", (req, res) => {
  res.send("Hello from pixel palace");
});