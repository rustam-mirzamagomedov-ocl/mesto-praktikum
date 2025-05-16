import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/unauthorized";
import { env } from "../utils/env";
export const authMiddleWare = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  const token =
    authorization && authorization.startsWith("Bearer ")
      ? authorization.split(" ")[1]
      : null;

  if (!token) {
    next(new UnauthorizedError("Необходима авторизация"));
    return;
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { _id: string };
    req.user = payload;
    next();
  } catch (_) {
    next(new UnauthorizedError("Необходима авторизация"));
  }
};
