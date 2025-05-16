import { model, Schema } from "mongoose";
import validator from "validator";

export const CardSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 30 },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => validator.isURL(value),
        message: "Некорректный URL",
      },
    },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
    likes: { type: [Schema.Types.ObjectId], ref: "user", default: [] },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  },
);

export const Card = model("card", CardSchema);
