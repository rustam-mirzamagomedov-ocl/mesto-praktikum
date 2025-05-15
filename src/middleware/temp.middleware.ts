import "express";
import { NextFunction, Request, Response } from "express";

export const tempMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  req.user = {
    _id: "6824ea78fb27d904a8e945d7",
  };
  next();
};
