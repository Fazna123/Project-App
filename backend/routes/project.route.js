import express from "express";
import {
  createProject,
  getProjects,
  getSingleProject,
} from "../controllers/project.controller.js";

const router = express.Router();

router.get("/", getProjects);

router.post("/", createProject);

router.get("/:id", getSingleProject);

export default router;
