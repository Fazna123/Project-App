import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import dotenv from "dotenv";
dotenv.config();

export const authVerify = (req, res, next) => {
  console.log(req.cookies.accessToken);
  const token = req.cookies.accessToken;
  if (!token) {
    return next(errorHandler(401, "Please Login!"));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(403, "JWT Token is not valid"));
    }
    console.log("user in auth:", user);
    req.user = user;
    next();
  });
};
