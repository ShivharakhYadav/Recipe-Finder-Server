import { Schema, model } from "mongoose";
import { emailReg } from "../utils/constant.js";

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: [true, "Name is Required"],
  },
  email: {
    type: Schema.Types.String,
    unique: [true, "{VALUE} Already Used"],
    required: [true, "email is Required"],
    match: [emailReg, "Email must be a valid email"],
  },
  password: {
    type: Schema.Types.String,
    required: [true, "password is Required"],
    min: [8, "password length must be at least 8 characters long"],
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

export default model("User", userSchema);
