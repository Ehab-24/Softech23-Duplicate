import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    credits:{
      type: Number,
      default: 0,
    },
    provider: {
      type: String,
      required: true,
    },
    stripeCustomerId: {
      type: String,
      required: true,
    },
    billingId: {
      type: String,
    },
    plan: {
      type: String,
      enum: ["free", "basic", "premium"],
      default: "free",
    },
    endDate: {
      type: Date,
      default: null,
    },
    subscriptionId: {
      type: String,
      default: null,
    },
    name: {
      type: String,
    },
});

const User = mongoose.model('User', userSchema);

export default User;