import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

export class ListRentalsByUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.user;

    const listRentalsByUserId = container.resolve(ListRentalsByUserUseCase);
    const response = await listRentalsByUserId.execute({ user_id: id });

    return res.status(200).send(response);
  }
}
