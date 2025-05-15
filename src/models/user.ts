import { model, Schema } from "mongoose";
import { isURL } from "../utils/isUrl";

export const UserSchema = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  about: { type: String, required: true, minlength: 2, maxlength: 200 },
  avatar: {
    type: String,
    required: true,
    validate: { validator: isURL, message: "Некорректный URL" },
  },
});

export const User = model("user", UserSchema);
