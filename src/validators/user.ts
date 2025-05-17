import { celebrate, Joi } from "celebrate";

export const userIdValidator = Joi.string().hex().length(24);
export const nameValidator = Joi.string().min(2).max(30);
export const aboutValidator = Joi.string().min(2).max(200);
export const avatarValidator = Joi.string().uri();

export const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: userIdValidator.required(),
  }),
});

export const updateProfileValidator = celebrate({
  body: Joi.object().keys({
    name: nameValidator.required(),
    about: aboutValidator.required(),
  }),
});

export const updateProfileAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: avatarValidator.required(),
  }),
});
