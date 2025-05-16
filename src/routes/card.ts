import { Router } from "express";
import {
  addLike,
  createCard,
  deleteCard,
  getCards,
  removeLike,
} from "../controllers/card";
import {
  addLikeValidator,
  createCardValidator,
  deleteCardValidator,
  removeLikeValidator,
} from "../validators/card";

export const cardRouter = Router();

cardRouter.get("/", getCards);
cardRouter.post("/", createCardValidator, createCard);
cardRouter.delete("/:cardId", deleteCardValidator, deleteCard);
cardRouter.put("/:cardId/likes", addLikeValidator, addLike);
cardRouter.delete("/:cardId/likes", removeLikeValidator, removeLike);
