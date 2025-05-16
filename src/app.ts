import "dotenv/config";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import { errorMiddleware } from "./middleware/error.middleware";
import { limiter } from "./middleware/limiter.middleware";
import { tempMiddleware } from "./middleware/temp.middleware";
import { cardRouter } from "./routes/card";
import { userRouter } from "./routes/user";

const { PORT = 3000, MONGO_DB_NAME, MONGO_DB_PATH } = process.env;

const app = express();
mongoose.connect(`${MONGO_DB_PATH}/${MONGO_DB_NAME}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(limiter);

// Временное решение до внедрения авторизации
app.use(tempMiddleware);

app.use("/users", userRouter);
app.use("/cards", cardRouter);

app.use(errorMiddleware);

app.use((_, res) => {
  res.status(404).send({ message: "Страница не найдена" });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const shutdown = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");

    server.close(() => {
      console.log("Server closed");
    });
  } catch (err) {
    console.error("Error during shutdown:", err);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("SIGQUIT", shutdown);
