import mongoose from 'mongoose';

const { Schema } = mongoose;

export const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add name'],
  },
  email: {
    type: String,
    required: [true, 'Please add email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please add password'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', userSchema);
