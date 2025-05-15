import { model, Schema } from "mongoose";
import { isURL } from "../utils/isUrl";

export const CardSchema = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  link: {
    type: String,
    required: true,
    validate: { validator: isURL, message: "Некорректный URL" },
  },
  owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  likes: { type: [Schema.Types.ObjectId], ref: "user", default: [] },
  createdAt: { type: Date, default: Date.now },
});

export const Card = model("card", CardSchema);
