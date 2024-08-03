import express from "express";
import cors from "cors";
import recipeRoutes from "./src/routes/recipe.routes.js";
import { connectDB, environmentConfig } from "./src/utils/configs.js";
import authRoutes from "./src/routes/auth.routes.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//* Routes
app.use("/auth", authRoutes);
app.use("/api", recipeRoutes);

const StartRecipeServer = async () => {
  try {
    await connectDB(environmentConfig.MONGODB_URL);
    app.listen(environmentConfig.PORT, () =>
      console.log(`Server Running on : ${environmentConfig.PORT}`)
    );
  } catch (error) {
    console.log("Internal Server Error", error.message);
  }
};

StartRecipeServer();
