import mongoose from 'mongoose';
import { Transaction } from './transactions';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
});

export const User = model('User', UserSchema);
