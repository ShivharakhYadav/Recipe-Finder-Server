import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { environmentConfig } from "./configs.js";

export const tokenKey = environmentConfig.RECIPE_JWT_TOKEN_KEY;

export const generateToken = (data) => {
  return jwt.sign(data, tokenKey, { expiresIn: "24h" });
};

export const hashPassword = async (password) => {
  try {
    if (!password) return false;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Password Encryption Failed", error.message);
    return false;
  }
};

export const matchPassword = async (password, hashPassword) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error) {
    console.error("Password Match Failed", error.message);
    return false;
  }
};
