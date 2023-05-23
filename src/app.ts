import dotenv from "dotenv";
import express, { NextFunction, Response, Request } from "express";

import "express-async-errors";

import "reflect-metadata";
import "@shared/container";
import { AppError } from "@shared/errors/AppError";
import { router } from "@shared/infra/http/routes";

import { createConnection } from "./shared/infra/typeorm";

dotenv.config();

createConnection();

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  return res.status(500).send({
    status: "error",
    message: `Internal server error! - ${err.message}`,
  });
});

export { app };
