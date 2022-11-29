import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UserRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  list(): Promise<User[]> {
    return this.repository.find();
  }
  async findByUsername(username: string): Promise<User> {
    const user = await this.repository.findOne({ where: { username } });
    return user;
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

export { UserRepository };
