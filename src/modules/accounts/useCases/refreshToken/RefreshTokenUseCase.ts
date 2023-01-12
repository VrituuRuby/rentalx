import { verify } from "jsonwebtoken";
import { inject } from "tsyringe";

import auth from "@config/auth";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";

interface IPayload {
  sub: string;
}

export class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
  ) {}
  async execute(token: string) {
    const decode = verify(token, auth.refresh_token_key) as IPayload;

    const user_id = decode.sub;

    const refreshToken = await this.userTokensRepository.findByUserIDAndToken(user_id, token);

    if (!refreshToken)
  }
}
