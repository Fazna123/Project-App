import express from "express";
import {
  addTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/:projectId", addTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

export default router;
