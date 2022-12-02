import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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

    const passwordHash = await hash(password, 8);

    if (userExists) throw new AppError("User already exists");
    await this.usersRepository.create({
      name,
      driver_license,
      password: passwordHash,
      email,
    });
  }
}

export { CreateUserUseCase };
