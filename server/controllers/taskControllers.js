import Task from "../models/Task.js";
import asyncHandler from "express-async-handler";
const createTask = asyncHandler(async (req, res) => {
  const { title, desc } = req.body;

  const task = await Task.create({ user: req.user._id, title, desc });

  if (task) {
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(400);
    throw new Error("task creation failed");
  }
});

const fetchTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find({ user: req.user._id });
  res.status(200).json(tasks);
});

const deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    await task.remove();
    res.json({
      success: true,
    });
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

const updateTask = asyncHandler(async (req, res, next) => {
  const { title, desc, completed } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { title, desc, completed },
    { new: true }
  );
  if (updatedTask) {
    res.status(200).json(updatedTask);
  } else {
    res.status(404);
    throw new Error("task not found");
  }
});
export { createTask, fetchTasks, deleteTask, updateTask };
