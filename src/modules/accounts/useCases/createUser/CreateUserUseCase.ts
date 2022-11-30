import { hash } from "bcryptjs";
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
  }: ICreateUserDTO): Promise<void> {
    const userExists = await this.userRepository.findUserByEmail(email);

    const passwordHash = await hash(password, 8);

    if (userExists) throw new Error("User already exists");
    await this.userRepository.create({
      name,
      driver_license,
      password: passwordHash,
      email,
    });
  }
}

export { CreateUserUseCase };
