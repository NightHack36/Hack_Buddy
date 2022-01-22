import mongoose from "mongoose";
import { UserStatus } from "../enums/UserStatus";
import { IUser } from "../models/user";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
  },
  linkedInLink: {
    type: String,
  },
  githubLink: {
    type: String,
  },
  status: {
    type: String,
    enum: UserStatus,
    required: true,
  },
  createdTime: {
    type: Number,
  },
  updatedTime: {
    type: Number,
    default: new Date().getTime(),
  },
});

export default mongoose.model<IUser>("User", userSchema);
