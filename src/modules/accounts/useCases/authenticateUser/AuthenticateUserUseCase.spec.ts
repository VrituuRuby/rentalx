import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepository: UsersRepositoryInMemory;
let authenticateUser: AuthenticateUserUseCase;
let createUser: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    authenticateUser = new AuthenticateUserUseCase(usersRepository);
    createUser = new CreateUserUseCase(usersRepository);
  });
  it("Must be possible to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "Test User",
      driver_license: "0001234",
      email: "email@text.com",
      password: "1234",
    };

    await createUser.execute(user);

    const result = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty("token");
  });

  it("Must not be possible to authenticate an inexistent user", async () => {
    expect(async () => {
      await authenticateUser.execute({
        email: "anotheremail@test.com",
        password: "password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Must not be possible to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      name: "Test User",
      driver_license: "0001234",
      email: "email@text.com",
      password: "1234",
    };

    await createUser.execute(user);

    expect(async () => {
      await authenticateUser.execute({
        email: user.email,
        password: "false-password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
