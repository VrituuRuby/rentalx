import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    driver_license,
    email,
    password,
  }: ICreateUserDTO): Promise<void> {
    const userExists = await this.usersRepository.findUserByEmail(email);
    if (userExists) throw new AppError("User already exists");

    const passwordHash = await hash(password, 8);
    await this.usersRepository.create({
      name,
      driver_license,
      password: passwordHash,
      email,
    });
  }
}

export { CreateUserUseCase };
