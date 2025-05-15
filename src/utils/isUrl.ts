import Joi from "joi";

export const isURL = (value: string) => {
  return !Joi.string().uri().validate(value).error;
};
