import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

export class UserMap {
  static toDTO({
    avatar,
    avatar_url,
    created_at,
    email,
    driver_license,
    id,
    name,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      id,
      name,
      email,
      driver_license,
      avatar,
      avatar_url,
      created_at,
    });
    return user;
  }
}
