import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { BadRequestError } from "../errors/bad-request";
import { NotFoundError } from "../errors/not-found";
import { User } from "../models/user";

export const getUsers = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      next(new NotFoundError("Пользователь не найден"));
      return;
    }

    res.status(200).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      next(new BadRequestError("Некорректный формат ID"));
      return;
    }
    next(error);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      next(new NotFoundError("Пользователь не найден"));
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      next(new NotFoundError("Пользователь не найден"));
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(error.message));
      return;
    }
    next(error);
  }
};

export const updateProfileAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      next(new NotFoundError("Пользователь не найден"));
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(error.message));
      return;
    }
    next(error);
  }
};
