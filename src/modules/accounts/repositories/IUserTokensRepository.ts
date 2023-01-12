import { ICreateUserTokensDTO } from "../dtos/ICreateUserTokensDTO";
import { UserToken } from "../infra/typeorm/entities/UserTokens";

export interface IUserTokensRepository {
  create(data: ICreateUserTokensDTO): Promise<UserToken>;
  findByUserIDAndToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken>;
}
