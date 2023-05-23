import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgottenPasswordUseCase } from "./SendForgottenPasswordUseCase";

export class SendForgottenPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const sendForgottenPasswordUseCase = container.resolve(
      SendForgottenPasswordUseCase,
    );

    await sendForgottenPasswordUseCase.execute(email);

    return res.send();
  }
}
