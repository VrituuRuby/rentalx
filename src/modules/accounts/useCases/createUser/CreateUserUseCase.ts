import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    driver_license,
    email,
    password,
    username,
  }: ICreateUserDTO): Promise<void> {
    const userExists = await this.userRepository.findByUsername(username);

    if (userExists) throw new Error("Username already exists");
    await this.userRepository.create({
      name,
      driver_license,
      username,
      password,
      email,
    });
  }
}

export { CreateUserUseCase };
