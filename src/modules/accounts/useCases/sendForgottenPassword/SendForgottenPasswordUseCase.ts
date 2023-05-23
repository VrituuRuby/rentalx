import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class SendForgottenPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DateProvider") private dateProvider: IDateProvider,
    @inject("MailProvider") private mailProvider: IMailProvider,
  ) {}
  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) throw new AppError("User doesn't exist", 404);

    const emailTemplatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgottenPassword.hbs",
    );

    const token = uuidv4();

    const expire_date = this.dateProvider.addHours(3);

    await this.userTokensRepository.create({
      refresh_token: token,
      expire_date,
      user_id: user.id,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOTTEN_PASS_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      emailTemplatePath,
    );
  }
}
