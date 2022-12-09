import { inject, injectable } from "tsyringe";

import { Specification } from "@modules/cars/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

@injectable()
export class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository,
  ) {}
  async execute(): Promise<Specification[]> {
    return this.specificationsRepository.list();
  }
}
