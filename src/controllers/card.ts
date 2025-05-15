import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request";
import { NotFoundError } from "../errors/not-found";
import { Card } from "../models/card";

export const getCards = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cards = await Card.find({}).populate(["owner", "likes"]);
    res.status(200).json(cards);
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
      return;
    }
    next(error);
  }
};

export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const card = await Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
    });
    const populatedCard = await card.populate("owner");
    res.status(201).json(populatedCard);
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
      return;
    }
    next(error);
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId).populate(
      "owner",
    );
    if (!card) {
      next(new NotFoundError("Карточка не найдена"));
      return;
    }
    res.status(200).json(card);
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
      return;
    }
    next(error);
  }
};

export const addLike = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $addToSet: { likes: req.user._id },
      },
      {
        new: true,
      },
    );
    res.status(200).json(card);
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
      return;
    }
    next(error);
  }
};

export const removeLike = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $pull: { likes: req.user._id },
      },
      {
        new: true,
      },
    );
    res.status(200).json(card);
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
      return;
    }
    next(error);
  }
};
