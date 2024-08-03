import axios, { AxiosError } from "axios";
import { environmentConfig } from "../utils/configs.js";
import User from "../models/user.model.js";
import Recipe from "../models/recipe.model.js";

const API_KEY = environmentConfig.RECIPE_API_KEY;
const API_URL = "https://api.spoonacular.com/recipes/findByIngredients";

export const SearchRecipe = async (req, res) => {
  const { ingredient } = req.query;
  console.log(req.query);
  try {
    const response = await axios.get(
      `${API_URL}?ingredients=${ingredient}&number=10&apiKey=${API_KEY}`
    );
    return res.status(200).json({
      status: true,
      message: "",
      data: response?.data,
    });
  } catch (error) {
    console.error(error);
    let message = error;
    if (error instanceof AxiosError) {
      message = error.response.data;
    }
    res.status(500).json({ error: message });
  }
};

export const Favorite = async (req, res) => {
  try {
    const { recipeId, recipeDetails } = req.body;
    const { _id } = user;

    const user = await User.findById(_id);
    const isFavorite = user?.favorites?.includes(recipeId);

    const isRecipeAvailable = await Recipe.findById(recipeId);
    if (!isRecipeAvailable) {
      let data = await Recipe.create(recipeDetails);
      recipeId = data._id;
    }

    if (isFavorite) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== recipeId
      );
      await user.save();
      return res.json({ status: true, message: "Favorite Removed", data: "" });
    } else {
      user.favorites.push(recipeId);
      await user.save();
      return res.json({ status: true, message: "Favorite added", data: "" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
