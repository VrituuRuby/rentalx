import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
    name: string;
  };
  token: string;
}
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Checks if user exists
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) throw new AppError("Incorrect email or password!");

    // Checks if password is right
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new AppError("Incorrect email or password");

    // Generate JWT token
    const token = await sign({}, "783c6491e6bd0d0119ded0b8706b915d", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
