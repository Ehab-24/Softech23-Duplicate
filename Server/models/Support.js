import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SupportSchema = new Schema({
    query: { type: String, required: true },
    customer : { type: Schema.Types.ObjectId, ref: 'Customer' },
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const Support = mongoose.model('Support', SupportSche);