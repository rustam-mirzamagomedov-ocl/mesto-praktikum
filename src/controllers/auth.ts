import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { BadRequestError } from "../errors/bad-request";
import { ConflictError } from "../errors/conflict";
import { UnauthorizedError } from "../errors/unauthorized";
import { User } from "../models/user";
import { env } from "../utils/env";

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      next(new UnauthorizedError("Неправильные почта или пароль"));
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      next(new UnauthorizedError("Неправильные почта или пароль"));
      return;
    }

    const token = jwt.sign({ _id: user._id }, env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    });

    res.send({
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, about, avatar, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });

    res.status(201).send({
      _id: newUser._id,
      name: newUser.name,
      about: newUser.about,
      avatar: newUser.avatar,
      email: newUser.email,
    });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === 11000) {
      next(new ConflictError("Пользователь с таким email уже существует"));
      return;
    }
    if (error instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(error.message));
      return;
    }
    next(error);
  }
};
