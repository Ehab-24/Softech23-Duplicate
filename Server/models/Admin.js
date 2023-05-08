import mongoose from "mongoose";
const Schema = mongoose.Schema;


const AdminSchema = new Schema({
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true }
});

export const Admin = mongoose.model("Admin", AdminSchema);