import express from "express";
import mongoose, { model } from "mongoose";

const router = express.Router;

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", UserSchema);
