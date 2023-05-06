import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    item_title: { type: String, required: true, unique: true },
    item_description: { type: String, required: true },
    item_price: { type: Number, required: true },
    item_cost: { type: Number, required: true },
    item_quantity: { type: Number, required: true },
    item_images: [{ type: String }],
    inventory_type: { type: String, required: true },
    mininmum_age: { type: Number, required: true }
});

const Item = mongoose.model("Item", ItemSchema);
export default Item;