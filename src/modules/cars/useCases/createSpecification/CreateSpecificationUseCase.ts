import { inject, injectable } from "tsyringe";

import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: SpecificationsRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationExists = await this.specificationsRepository.findByName(
      name,
    );

    if (specificationExists) throw new Error("Specification already exists");
    await this.specificationsRepository.create({ name, description });
  }
}
