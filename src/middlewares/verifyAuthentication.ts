import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

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
      "783c6491e6bd0d0119ded0b8706b915d",
    )) as IPayload;

    const userRepository = new UserRepository();
    const user = await userRepository.findById(user_id);

    if (!user) throw new AppError("User doesn't exists!");

    req.user.id = user_id;

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}

export { verifyAuthentication };
