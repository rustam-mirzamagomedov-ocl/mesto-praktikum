import { celebrate, Joi } from "celebrate";

export const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

export const updateProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
});

export const updateProfileAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
});
