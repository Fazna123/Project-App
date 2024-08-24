import express from "express";
import {
  createGist,
  createProject,
  getProjects,
  getSingleProject,
  updateProjectTitle,
} from "../controllers/project.controller.js";

const router = express.Router();

router.get("/:id", getProjects);

router.post("/", createProject);

router.get("/get-project/:id", getSingleProject);

router.put("/update/:id", updateProjectTitle);

router.post("/create-gist", createGist);

export default router;
