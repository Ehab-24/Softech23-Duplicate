const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: { type: String, required: true, unique: true },
    hash_password: { type: String, required: true }
});

AdminSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model('Admin', AdminSchema);