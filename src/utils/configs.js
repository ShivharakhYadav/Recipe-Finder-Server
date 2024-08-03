import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const defaultError = "DB Connection Failed :";

export const connectDB = async (URL) => {
  try {
    if (!URL) throw new Error("Connection URL Not Found");
    await mongoose
      .connect(URL)
      .then(() => console.log("Database Connected Successfully"))
      .catch((error) => console.log(`${defaultError} ${error.message}`));
  } catch (error) {
    console.log(`${defaultError} ${error.message}`);
  }
};

export const environmentConfig = Object.freeze({
  PORT: process.env.PORT || 4000,
  MONGODB_URL: process.env.MONGODB_URL || "",
  RECIPE_API_KEY: process.env.RECIPE_API_KEY || "",
  RECIPE_JWT_TOKEN_KEY:
    process.env.RECIPE_JWT_TOKEN_KEY || "h3BizkwjWbGXP8P9re81XVwx1qAKdWoF",
});
