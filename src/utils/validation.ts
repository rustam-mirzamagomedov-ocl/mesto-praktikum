import Joi from "joi";

export const isURL = (value: string) => {
  return !Joi.string().uri().validate(value).error;
};

export const isEmail = (value: string) => {
  return !Joi.string().email().validate(value).error;
};
