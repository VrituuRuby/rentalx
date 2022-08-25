import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest) {
    const specificationExists = this.specificationsRepository.findByName(name);
    if (specificationExists) throw Error("Specification alredy exists!");

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
