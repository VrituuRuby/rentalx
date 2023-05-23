import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
    name: string;
  };
  access_token: string;
  refresh_token: string;
}
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Checks if user exists
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) throw new AppError("Incorrect email or password!");

    // Checks password match
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new AppError("Incorrect email or password!");

    const {
      access_token_expires_in,
      access_token_secret,
      refresh_token_secret,
      refresh_token_expires_in,
      expire_days,
    } = auth;

    // Generate JWT token
    const access_token = sign({}, access_token_secret, {
      subject: user.id,
      expiresIn: access_token_expires_in,
    });

    const refresh_token = sign({ email }, refresh_token_secret, {
      subject: user.id,
      expiresIn: refresh_token_expires_in,
    });

    await this.userTokensRepository.create({
      user_id: user.id,
      expire_date: this.dateProvider.addDays(expire_days),
      refresh_token,
    });

    const tokenReturn: IResponse = {
      access_token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
