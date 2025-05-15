import { Router } from "express";
import {
  createUser,
  getProfile,
  getUserById,
  getUsers,
  updateUser,
  updateUserAvatar,
} from "../controllers/user";

export const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/", createUser);
userRouter.get("/me", getProfile);
userRouter.get("/:userId", getUserById);
userRouter.patch("/:userId", updateUser);
userRouter.patch("/me/avatar", updateUserAvatar);
