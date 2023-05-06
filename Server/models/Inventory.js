const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item', required: true }],
});

module.exports = mongoose.model('Inventory', InventorySchema);