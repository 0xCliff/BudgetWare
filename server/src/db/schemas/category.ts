import mongoose from 'mongoose';
import { Transaction } from './transactions';

const { Schema, model } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transactions', required: true }],
});

CategorySchema.post('findOneAndDelete', async (category) => {
  if (category.transactions.length) {
    await Transaction.deleteMany({ _id: { $in: category.transactions } });
  }
});

export const Category = model('Category', CategorySchema);
