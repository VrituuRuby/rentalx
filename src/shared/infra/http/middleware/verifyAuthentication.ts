import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

async function verifyAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) throw new AppError("Missing token!", 401);

  const [, token] = authHeaders.split(" ");

  try {
    const { sub: user_id } = (await verify(
      token,
      auth.jwt_secret_key,
    )) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError("User doesn't exists!");

    req.user = {
      id: user_id,
    };
    next();
  } catch (error) {
    throw new Error(error);
  }
}

export { verifyAuthentication };
