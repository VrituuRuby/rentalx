import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserTokens";

export interface IUserTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
  findByUserIDAndToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken>;
  findByRefreshToken(token: string): Promise<UserToken>;
}
