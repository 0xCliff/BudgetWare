import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transactions', required: true }],
});

export const Category = model('Category', CategorySchema);
