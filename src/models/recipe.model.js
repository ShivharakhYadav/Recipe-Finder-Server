import { Schema, model } from "mongoose";

const RecipeSchema = new Schema({
  title: String,
  ingredients: [String],
  imageUrl: String,
});

export default model("Recipe", RecipeSchema);
