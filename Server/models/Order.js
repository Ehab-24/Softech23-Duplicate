import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    order_date: { type: Date, required: true },
    order_status: { type: String, required: true },
    order_total: { type: Number, required: true },
    order_items: [{ type: Schema.Types.ObjectId, ref: 'Item', required: true }],
    customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;