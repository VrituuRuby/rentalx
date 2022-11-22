import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationUseCase {
  constructor(private specificationsRepository: SpecificationsRepository) {}

  execute({ name, description }: IRequest) {
    const specificationExists = this.specificationsRepository.findByName(name);

    if (specificationExists) throw new Error("Specification already exists");
    this.specificationsRepository.create({ name, description });
  }
}
