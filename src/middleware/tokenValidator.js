import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { environmentConfig } from "../utils/configs.js";

export const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        status: false,
        message: "Invalid Token...!",
        data: "",
      });
    }

    const scheme = authorization.split(" ")[0];
    if (scheme !== "Bearer") {
      return res.status(401).json({
        status: false,
        message: "Invalid Token...!",
        data: "",
      });
    }
    const token = authorization.split(" ")[1];

    jwt.verify(
      token,
      environmentConfig.RECIPE_JWT_TOKEN_KEY,
      async (err, payload) => {
        if (err) {
          return res.status(401).json({
            status: false,
            message: "Invalid username or password..!",
            data: "",
          });
        }
        console.log("payload", payload);
        const { id } = payload;
        const user = await User.findOne({ _id: id }, { password: 0 });
        if (user) {
          req.user = user;
          next();
        } else {
          return res.status(401).json({
            status: false,
            message: "User not found..!",
            data: "",
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      data: "",
    });
  }
};
