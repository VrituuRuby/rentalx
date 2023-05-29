import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileUserUseCase } from "./ProfileUserUseCase";

export class ProfileUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const profileUserUseCase = container.resolve(ProfileUserUseCase);

    const user = await profileUserUseCase.execute(req.user.id);

    return res.json(user);
  }
}
