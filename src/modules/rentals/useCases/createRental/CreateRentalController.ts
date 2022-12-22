import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

export class CreateRentalController {
  async handle(req: Request, res: Response) {
    const { expected_return_date, car_id } = req.body;
    const { id } = req.user;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);
    const rental = await createRentalUseCase.execute({
      expected_return_date,
      car_id,
      user_id: id,
    });

    return res.status(201).send(rental);
  }
}
