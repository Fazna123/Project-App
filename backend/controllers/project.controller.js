import Project from "../models/project.model.js";
import Todo from "../models/todo.model.js";

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
