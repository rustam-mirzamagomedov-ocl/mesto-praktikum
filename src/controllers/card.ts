import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { BadRequestError } from "../errors/bad-request";
import { ForbiddenError } from "../errors/forbidden";
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
  } catch (error) {
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
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
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
    const card = await Card.findById(req.params.cardId).populate("owner");

    if (!card) {
      next(new NotFoundError("Карточка не найдена"));
      return;
    }

    if (card.owner._id.toString() !== req.user._id) {
      next(new ForbiddenError("Вы не можете удалить эту карточку"));
      return;
    }

    await card.deleteOne();

    res.status(200).json({ message: "Карточка удалена" });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      next(new BadRequestError("Некорректный формат ID карточки"));
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
        runValidators: true,
      },
    );
    res.status(200).json(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      next(new BadRequestError("Некорректный формат ID карточки"));
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
        runValidators: true,
      },
    );
    res.status(200).json(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      next(new BadRequestError("Некорректный формат ID карточки"));
      return;
    }
    next(error);
  }
};
