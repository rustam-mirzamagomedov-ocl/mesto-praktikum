import { Router } from "express";
import {
  addLike,
  createCard,
  deleteCard,
  getCards,
  removeLike,
} from "../controllers/card";

export const cardRouter = Router();

cardRouter.get("/", getCards);
cardRouter.post("/", createCard);
cardRouter.delete("/:cardId", deleteCard);
cardRouter.put("/:cardId/likes", addLike);
cardRouter.delete("/:cardId/likes", removeLike);
