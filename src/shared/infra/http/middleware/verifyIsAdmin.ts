import { Request, Response, NextFunction } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

async function verifyIsAdmin(req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user.admin) throw new AppError("User is not system administrator");

  next();
}

export { verifyIsAdmin };
