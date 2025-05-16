import { Router } from "express";
import {
  createUser,
  getProfile,
  getUserById,
  getUsers,
  updateProfile,
  updateProfileAvatar,
} from "../controllers/user";

export const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/", createUser);
userRouter.get("/me", getProfile);
userRouter.patch("/me", updateProfile);
userRouter.get("/:userId", getUserById);
userRouter.patch("/me/avatar", updateProfileAvatar);
