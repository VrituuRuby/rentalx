import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositpryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/DayjsDateProvider";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgottenPasswordUseCase } from "./SendForgottenPasswordUseCase";

let userRepostoryInMemory: IUsersRepository;
let userTokensRepositoryInMemory: IUserTokensRepository;
let dateProvider: IDateProvider;
let mailProvider: IMailProvider;

let sendForgottenPasswordUseCase: SendForgottenPasswordUseCase;

describe("Send Forgotten Password Email", () => {
  beforeEach(() => {
    userRepostoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgottenPasswordUseCase = new SendForgottenPasswordUseCase(
      userRepostoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });
  it("Should be able to send a forgot password email to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await userRepostoryInMemory.create({
      driver_license: "123456",
      email: "test@mail.com",
      name: "Test User",
      password: "password",
    });

    await sendForgottenPasswordUseCase.execute("test@mail.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send an email if user doesn't exists", async () => {
    await expect(
      sendForgottenPasswordUseCase.execute("nonexistent@mail.com"),
    ).rejects.toEqual(new AppError("User doesn't exist", 404));
  });
  it("Should be able to create a new refresh token after sending mail", async () => {
    const create = jest.spyOn(userTokensRepositoryInMemory, "create");

    await userRepostoryInMemory.create({
      driver_license: "123456",
      email: "test@mail.com",
      name: "Test User",
      password: "password",
    });
    await sendForgottenPasswordUseCase.execute("test@mail.com");
    expect(create).toBeCalled();
  });
});
