import { Repository } from "typeorm";

import { Specification } from "../../entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  findByName(name: string): Specification {
    // const specification = this.specifications.find(spec => spec.name === name);
    // return specification;
  }

  list(): Specification[] {
    // return this.specifications;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    // const specification = new Specification();
    // Object.assign(specification, {
    //   name,
    //   description,
    //   createdAt: new Date(),
    // });
    // this.specifications.push(specification);
  }
}
