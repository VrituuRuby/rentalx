import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, brand, category_id } = req.query;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase,
    );

    const response = await listAvailableCarsUseCase.execute({
      category_id: category_id as string,
      name: name as string,
      brand: brand as string,
    });

    return res.send(response);
  }
}

export { ListAvailableCarsController };
