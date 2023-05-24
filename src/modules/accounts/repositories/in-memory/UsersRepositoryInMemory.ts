import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create({
    name,
    driver_license,
    email,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      driver_license,
      email,
      password,
    });

    this.users.push(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  async list(): Promise<User[]> {
    return this.users;
  }
}

export { UsersRepositoryInMemory };
