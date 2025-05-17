import { celebrate, Joi } from "celebrate";
import { aboutValidator, avatarValidator, nameValidator } from "./user";

export const passwordValidator = Joi.string().min(6);
export const emailValidator = Joi.string().email();

export const signupValidator = celebrate({
  body: Joi.object().keys({
    email: emailValidator.required(),
    password: passwordValidator.required(),
    name: nameValidator,
    about: aboutValidator,
    avatar: avatarValidator,
  }),
});

export const signinValidator = celebrate({
  body: Joi.object().keys({
    email: emailValidator.required(),
    password: passwordValidator.required(),
  }),
});
