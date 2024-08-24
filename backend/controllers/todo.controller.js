import Todo from "../models/todo.model.js";
import Project from "../models/project.model.js";
import { errorHandler } from "../utils/error.js";

export const addTodo = async (req, res, next) => {
  try {
    const todo = new Todo({
      description: req.body.description,
      project: req.body.project,
    });
    const saveTodo = await todo.save();
    const project = await Project.findById(req.params.id);
    project.todos.push(saveTodo._id);
    await project.save();
    res.status(201).json(saveTodo);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        description: req.body.description,
        status: req.body.status,
      },
      { new: true }
    );
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Todo deleted" });
  } catch (error) {
    next(error);
  }
};
