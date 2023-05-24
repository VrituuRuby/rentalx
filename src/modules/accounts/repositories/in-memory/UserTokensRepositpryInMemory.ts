import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUserTokensRepository } from "../IUserTokensRepository";

export class UserTokensRepositoryInMemory implements IUserTokensRepository {
  private usersTokens: UserToken[] = [];

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, data);

    this.usersTokens.push(userToken);

    return userToken;
  }
  async deleteById(id: string): Promise<void> {
    const index = this.usersTokens.findIndex(userToken => userToken.id === id);
    this.usersTokens.splice(index, 1);
  }
  async findByUserIDAndToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken> {
    return this.usersTokens.find(
      uT => uT.user_id === user_id && uT.refresh_token === refresh_token,
    );
  }
  async findByRefreshToken(token: string): Promise<UserToken> {
    return this.usersTokens.find(
      userToken => userToken.refresh_token === token,
    );
  }
}
