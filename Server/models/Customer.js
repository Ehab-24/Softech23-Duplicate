import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true},
    hashedPassword: { type: String, required: true },
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
});


export const Customer = mongoose.model("Customer", CustomerSchema);