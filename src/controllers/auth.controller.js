import User from "../models/user.model.js";
import { generateToken, hashPassword, matchPassword } from "../utils/helper.js";

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const isAlreadyUser = await User.findOne({ email: email });

    if (isAlreadyUser) {
      return res.status(409).json({
        status: false,
        message: "User already exists",
        data: "",
      });
    }

    const Password = await hashPassword(password);
    if (!Password) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        data: "",
      });
    }

    await User.create({ email: email, password: Password, name: name });

    return res.status(200).json({
      status: true,
      message: "Register Successfully",
      data: "",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error,
      data: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const data = await User.findOne({ email: email });

  if (!data) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized User",
      data: "",
    });
  }

  const isMatch = await matchPassword(password, data?.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ status: false, message: "Invalid credentials", data: "" });
  }
  const token = generateToken({ id: data.id, email: req.email });
  return res.status(200).json({
    status: true,
    message: "",
    data: { accessToken: token },
  });
};
