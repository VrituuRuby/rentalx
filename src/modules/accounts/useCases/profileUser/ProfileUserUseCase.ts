import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
  ) {}
  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError("User doesn't exists");

    return UserMap.toDTO(user);
  }
}
