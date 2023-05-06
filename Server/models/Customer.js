const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    customer_name: { type: String, required: true, unique: true },
    customer_email: { type: String, required: true },
    customer_dob: { type: Date, required: true },
    customer_password: { type: String, required: true },
});

module.exports = mongoose.model('Customer', CustomerSchema);