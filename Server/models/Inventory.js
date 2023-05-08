import mongoose from "mongoose";
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    name: { type: String, required: true, unique: true },
});

const Inventory = mongoose.model("Inventory", InventorySchema);
export default Inventory;