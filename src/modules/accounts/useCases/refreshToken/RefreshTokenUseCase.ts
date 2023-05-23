import { verify } from "jsonwebtoken";
import { inject } from "tsyringe";

import auth from "@config/auth";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

export class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
  ) {}
  async execute(token: string) {
    const { email, sub } = verify(token, auth.refresh_token_secret) as IPayload;

    const user_id = sub;

    const userToken = await this.userTokensRepository.findByUserIDAndToken(
      user_id,
      token,
    );

    if (!userToken) throw new AppError("User's refresh token doesn't exists");

    await this.userTokensRepository.deleteById(userToken.id);
  }
}
