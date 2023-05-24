import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositpryInMemory";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/DayjsDateProvider";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepository: UsersRepositoryInMemory;
let userTokensRepository: IUserTokensRepository;
let dateProvider: IDateProvider;
let authenticateUser: AuthenticateUserUseCase;
let createUser: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    userTokensRepository = new UserTokensRepositoryInMemory();
    authenticateUser = new AuthenticateUserUseCase(
      usersRepository,
      userTokensRepository,
      dateProvider,
    );
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
    expect(result).toHaveProperty("access_token");
    expect(result).toHaveProperty("refresh_token");
  });

  it("Must not be possible to authenticate an inexistent user", async () => {
    await expect(
      authenticateUser.execute({
        email: "anotheremail@test.com",
        password: "password",
      }),
    ).rejects.toEqual(new AppError("Incorrect email or password!"));
  });

  it("Must not be possible to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      name: "Test User",
      driver_license: "0001234",
      email: "email@text.com",
      password: "1234",
    };

    await createUser.execute(user);

    await expect(
      authenticateUser.execute({
        email: user.email,
        password: "false-password",
      }),
    ).rejects.toEqual(new AppError("Incorrect email or password!"));
  });
});
