import Project from "../models/project.model.js";
import Todo from "../models/todo.model.js";
import { errorHandler } from "../utils/error.js";
import axios from "axios";

export const createProject = async (req, res, next) => {
  try {
    const project = new Project({
      title: req.body.title,
      user: req.body.userId,
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    //console.log(req.user);

    const projects = await Project.find({ user: req.params.id }).populate(
      "todos"
    );
    //console.log("projects:", projects);
    res.status(201).json(projects);
  } catch (error) {
    next(error);
  }
};

export const getSingleProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate("todos");
    //console.log("project:", project);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const updateProjectTitle = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
    });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Project completed" });
  } catch (error) {
    next(error);
  }
};

export const createGist = async (req, res, next) => {
  try {
    const { gistData } = req.body;

    const response = await axios.post(
      "https://api.github.com/gists",
      gistData,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
