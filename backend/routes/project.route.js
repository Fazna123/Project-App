import express from "express";
import {
  createProject,
  getProjects,
  getSingleProject,
  updateProjectTitle,
} from "../controllers/project.controller.js";

const router = express.Router();

router.get("/", getProjects);

router.post("/", createProject);

router.get("/:id", getSingleProject);

router.put("/update/:id", updateProjectTitle);

export default router;
