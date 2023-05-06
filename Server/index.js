import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import gptRoutes from "./routes/gptRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import subRoutes from "./routes/subs.js"
import "./passport.js"
import passport from "passport";
import User from "./models/user.js";
import bodyParser from "body-parser";
import session from "express-session";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
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

//Server routes

app.get("/", (req, res) => {
  res.send("Hello from AntsqAI!");
});

app.use("/gpt", gptRoutes);
app.use("/auth", authRoutes); 
app.use("/subs", subRoutes);