import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    review_text: { type: String, required: true },
    rating: { type: Number, min:0, max:5, required: true },
    item_id:{type: Schema.Types.ObjectId, ref: 'Item', required: true},
    customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
});

export const Review = mongoose.model('Review', ReviewSchema);