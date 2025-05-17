import { celebrate, Joi } from "celebrate";

export const cardIdValidator = Joi.string().hex().length(24);

export const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }),
});

export const deleteCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: cardIdValidator.required(),
  }),
});

export const addLikeValidator = celebrate({
  params: Joi.object().keys({
    cardId: cardIdValidator.required(),
  }),
});

export const removeLikeValidator = celebrate({
  params: Joi.object().keys({
    cardId: cardIdValidator.required(),
  }),
});
