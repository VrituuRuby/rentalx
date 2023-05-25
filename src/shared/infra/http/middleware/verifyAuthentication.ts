import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";
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
    const { sub: user_id } = verify(
      token,
      auth.access_token_secret,
    ) as IPayload;

    req.user = {
      id: user_id,
    };
    next();
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
}

export { verifyAuthentication };
