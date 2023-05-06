const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    password: { type: String, required: true },
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
});

module.exports = mongoose.model('Customer', CustomerSchema);