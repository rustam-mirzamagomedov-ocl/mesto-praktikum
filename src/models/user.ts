import { model, Schema } from "mongoose";
import { isEmail, isURL } from "../utils/validation";

export const UserSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 30 },
    about: { type: String, required: true, minlength: 2, maxlength: 200 },
    avatar: {
      type: String,
      required: true,
      validate: { validator: isURL, message: "Некорректный URL" },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: { validator: isEmail, message: "Некорректный Email" },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    versionKey: false,
  },
);

export const User = model("user", UserSchema);
