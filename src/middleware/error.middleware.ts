import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  _: NextFunction,
) => {
  if (err instanceof Error) {
    if ("statusCode" in err && typeof err.statusCode === "number") {
      res.status(err.statusCode).send({ message: err.message });
      return;
    }
  }
  res.status(500).send({ message: "На сервере произошла ошибка" });
};
