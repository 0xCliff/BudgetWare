import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionCookie: { type: String, select: false },
  },
});

export const UserModel = model('User', UserSchema);
