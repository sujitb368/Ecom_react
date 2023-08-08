import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    phone: {
      type: String,
      require: true,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      require: true,
      trim: true,
    },
    answer: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
