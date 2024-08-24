import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }
  const user = await User.findOne({ email });
  if (user) {
    console.log("user found");
    return next(errorHandler(400, "This email is already registered"));
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  try {
    await newUser.save();
    console.log("registered");
    res.status(201).json({ message: "You have registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "Please register first"));
    }
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid credentials"));
    }
    const { password: hashedPassword, ...rest } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    // res
    //   .cookie("accessToken", token, {
    //     httpOnly: true,
    //     maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    //   })
    //   .status(200)
    //   .json({ success: true, user: rest });
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        path: "/",
        secure: false,
        sameSite: "none",
      })
      .status(200)
      .json({ success: true, user: rest });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken").status(200).json("Logged out successfully");
  } catch (error) {
    next(error);
  }
};
