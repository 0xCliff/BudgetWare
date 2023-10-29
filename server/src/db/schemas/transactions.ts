import mongoose from 'mongoose';
import { User } from './users';

const { Schema, model } = mongoose;

const TransactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now(), required: true },
  category: { type: String, ref: 'Category', required: true },
  price: { type: Number, required: true },
});

TransactionSchema.post('findOneAndDelete', async (transaction) => {
  if (transaction.user) {
    await User.deleteOne({ _id: { $in: transaction.user.transactions } });
  }
});

export const Transaction = model('Transaction', TransactionSchema);
