const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    review_text: { type: String, required: true },
    rating: { type: Number, min:0, max:5, required: true },

    customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
});

module.exports = mongoose.model('Review', ReviewSchema);