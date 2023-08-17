// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  linkedIn: string;
  company: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    linkedIn: { type: String, required: true },
    company: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.index( {
  name: 1,
  email: 1,
  phone: 1,
  linkedIn: 1,
  company: 1
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
