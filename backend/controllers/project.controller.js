import Project from "../models/project.model.js";
import Todo from "../models/todo.model.js";
import { errorHandler } from "../utils/error.js";

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
    const projects = await Project.find().populate("todos");
    res.status(201).json(projects);
  } catch (error) {
    next(error);
  }
};

export const getSingleProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate("todos");
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
