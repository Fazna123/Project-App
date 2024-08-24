import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import projectRoute from "./routes/project.route.js";
import todoRoute from "./routes/todo.route.js";
import cors from "cors";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import errorMiddleWare from "./middlewares/error.middleware.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/user", userRoute);
app.use("/api/project", projectRoute);
app.use("/api/todo", todoRoute);

app.use((req, res, next) => {
  console.log("Cookies:", req.cookies); // Check if cookies are being parsed correctly
  next();
});

app.use(errorMiddleWare);

app.listen(3000, () => {
  console.log("Server on http://localhost:3000");
  connectDb();
});
