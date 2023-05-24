import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

import { Category } from "../../infra/typeorm/entities/Category";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(category => category.name === name);
    return category;
  }
  async list(): Promise<Category[]> {
    const all = this.categories;
    return all;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { name, description });

    this.categories.push(category);

    return category;
  }
}

export { CategoriesRepositoryInMemory };
