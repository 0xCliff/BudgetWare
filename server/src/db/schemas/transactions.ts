import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const TransactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now(), required: true },
  category: { type: String, ref: 'Category', required: true },
  price: { type: Number, required: true },
});

export const Transaction = model('Transaction', TransactionSchema);
