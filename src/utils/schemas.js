import joi from "joi";
import { emailReg } from "./constant.js";

export const loginSchema = joi.object({
  email: joi.string().email().required().pattern(emailReg),
  password: joi.string().required().min(8),
});

export const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required().pattern(emailReg),
  password: joi.string().required().min(8),
});
