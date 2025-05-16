import { Router } from "express";
import {
  getProfile,
  getUserById,
  getUsers,
  updateProfile,
  updateProfileAvatar,
} from "../controllers/user";
import {
  getUserByIdValidator,
  updateProfileAvatarValidator,
  updateProfileValidator,
} from "../validators/user";
export const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getProfile);
userRouter.patch("/me", updateProfileValidator, updateProfile);
userRouter.get("/:userId", getUserByIdValidator, getUserById);
userRouter.patch(
  "/me/avatar",
  updateProfileAvatarValidator,
  updateProfileAvatar,
);
