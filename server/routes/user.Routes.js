import express from "express";
const router = express.Router();
import {
  login,
  register,
  updateProfile,
  userProfile,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/me").get(protect, userProfile).put(protect, updateProfile);
export default router;
