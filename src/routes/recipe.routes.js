import express from "express";
import { Favorite, SearchRecipe } from "../controllers/recipe.controller.js";
import { verifyToken } from "../middleware/tokenValidator.js";

const recipeRoutes = express.Router();

recipeRoutes.get("/search", SearchRecipe);
recipeRoutes.post("/favorite", verifyToken, Favorite);
export default recipeRoutes;
