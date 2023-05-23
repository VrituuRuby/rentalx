import { Repository } from "typeorm";

import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { AppDataSource } from "@shared/infra/typeorm";

import { UserToken } from "../entities/UserTokens";

export class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserToken);
  }
  DeleteQueryBuilder(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async create({
    expire_date,
    refresh_token,
    user_id,
  }: ICreateUserTokensDTO): Promise<UserToken> {
    const user_token = this.repository.create({
      expire_date,
      refresh_token,
      user_id,
    });
    await this.repository.save(user_token);

    return user_token;
  }
  findByUserIDAndToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken> {
    return this.repository.findOne({ where: { user_id, refresh_token } });
  }

  async deleteById(id: string) {
    await this.repository.delete(id);
  }
}
