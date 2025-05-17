import Joi from "joi";

type Env = {
  PORT: number;
  MONGO_DB_NAME: string;
  MONGO_DB_PATH: string;
  JWT_SECRET: string;
  NODE_ENV: "development" | "production";
};

const envSchema = Joi.object({
  PORT: Joi.number().default(3000),
  MONGO_DB_NAME: Joi.string().required(),
  MONGO_DB_PATH: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  NODE_ENV: Joi.string()
    .valid("development", "production")
    .default("development"),
});

const validateEnv = (): Env => {
  const { error, value } = envSchema.validate(
    {
      PORT: process.env.PORT ? Number.parseInt(process.env.PORT) : undefined,
      MONGO_DB_NAME: process.env.MONGO_DB_NAME ?? "mesto",
      MONGO_DB_PATH: process.env.MONGO_DB_PATH ?? "mongodb://localhost:27017",
      JWT_SECRET: process.env.JWT_SECRET ?? "dev-secret",
      NODE_ENV: process.env.NODE_ENV ?? "development",
    },
    { abortEarly: false },
  );

  if (error) {
    throw new Error(`Environment validation error: ${error.message}`);
  }

  return value as Env;
};

export const env = validateEnv();
