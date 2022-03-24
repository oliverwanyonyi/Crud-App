import express from "express";
import {
  createTask,
  fetchTasks,
  deleteTask,
  updateTask,
} from "../controllers/taskControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/:id").delete(protect, deleteTask).put(protect, updateTask);

router.route("/create").post(protect, createTask);
router.route("/all").get(protect, fetchTasks);

export default router;
