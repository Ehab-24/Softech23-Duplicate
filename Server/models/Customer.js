const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    hash_password: { type: String, required: true },
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
});

CustomerSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model('Customer', CustomerSchema);