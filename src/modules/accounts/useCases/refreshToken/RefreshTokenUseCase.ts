import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  email: string;
  sub: string;
}

interface ITokenResponse {
  access_token: string;
  refresh_token: string;
}
@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
  ) {}
  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub: user_id } = verify(
      token,
      auth.refresh_token_secret,
    ) as IPayload;

    const userToken = await this.userTokensRepository.findByUserIDAndToken(
      user_id,
      token,
    );

    if (!userToken) throw new AppError("User's refresh token doesn't exists");

    await this.userTokensRepository.deleteById(userToken.id);

    const access_token = sign({}, auth.access_token_secret, {
      subject: user_id,
      expiresIn: auth.access_token_expires_in,
    });

    const refresh_token = sign({ email }, auth.refresh_token_secret, {
      subject: user_id,
      expiresIn: auth.refresh_token_expires_in,
    });

    await this.userTokensRepository.create({
      user_id,
      expire_date: this.dateProvider.addDays(auth.expire_days),
      refresh_token,
    });

    return { access_token, refresh_token };
  }
}
