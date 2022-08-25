import { Specification } from "../model/Specification";

interface ICreateScpecificationDTO {
  name: string;
  description: string;
}
interface ISpecificationRepository {
  create({ name, description }: ICreateScpecificationDTO): void;
  findByName(name: string): Specification;
}

export { ISpecificationRepository, ICreateScpecificationDTO };
