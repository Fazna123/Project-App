import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import projectRoute from "./routes/project.route.js";
import cors from "cors";
import connectDb from "./config/db.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/user", userRoute);
app.use("/api/project", projectRoute);

app.listen(3000, () => {
  console.log("Server on http://localhost:3000");
  connectDb();
});
