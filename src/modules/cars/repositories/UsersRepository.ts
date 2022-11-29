import { Repository } from "typeorm";

import { AppDataSource } from "../../../database";
import { ICreateUserDTO } from "../../accounts/dtos/ICreateUserDTO";
import { User } from "../../accounts/entities/User";
import { IUsersRepository } from "./IUsersRepository";

class UserRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    name,
    username,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      password,
      email,
      driver_license,
    });

    await this.repository.save(user);
  }
}