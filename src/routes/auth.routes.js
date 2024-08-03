import express from "express";
import { loginSchema, registerSchema } from "../utils/schemas.js";
import { login, register } from "../controllers/auth.controller.js";
import { validateBody } from "../middleware/bodyValidate.js";

const authRoutes = express.Router();

authRoutes.post("/register", validateBody(registerSchema), register);
authRoutes.post("/login", validateBody(loginSchema), login);

export default authRoutes;
