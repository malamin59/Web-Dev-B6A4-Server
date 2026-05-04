import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String, // only for credentials login
    },

    provider: {
      type: String,
      enum: ["google", "github", "credentials"],
      default: "credentials",
    },

    role: {
      type: String,
      enum: ["STUDENT", "ADMIN", "TUTOR"],
      default: "STUDENT",
    },

    phone: String,
    image: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;