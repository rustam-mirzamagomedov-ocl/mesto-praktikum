import { errors } from "celebrate";
import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import { signIn, signUp } from "./controllers/auth";
import { authMiddleWare } from "./middleware/auth.middleware";
import { errorMiddleware } from "./middleware/error.middleware";
import { limiter } from "./middleware/limiter.middleware";
import { errorLogger, requestLogger } from "./middleware/logger";
import { cardRouter } from "./routes/card";
import { userRouter } from "./routes/user";
import { env } from "./utils/env";

const app = express();
mongoose.connect(`${env.MONGO_DB_PATH}/${env.MONGO_DB_NAME}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
// Тут можно настроить CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(requestLogger);
app.use(limiter);

app.use("/signup", signUp);
app.use("/signin", signIn);

app.use(authMiddleWare);

app.use("/users", userRouter);
app.use("/cards", cardRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.use((_, res) => {
  res.status(404).send({ message: "Страница не найдена" });
});

const server = app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
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
