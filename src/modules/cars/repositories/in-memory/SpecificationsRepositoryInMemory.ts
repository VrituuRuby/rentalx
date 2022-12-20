import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecs = this.specifications.filter(specification =>
      ids.includes(specification.id),
    );
    return allSpecs;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = await this.specifications.find(
      spec => spec.name === name,
    );
    return specification;
  }
  async list(): Promise<Specification[]> {
    return this.specifications;
  }
  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);
    return specification;
  }
}

export { SpecificationsRepositoryInMemory };
