import { Category } from "../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepository {
  /*
  Repositories are pieces of logic responsible to only and all the data management 
  of an application i.e. manipulate directly the database

  currently data is only used on memory of the application
  */
  private categories: Category[]; // In-memory categories array

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO) {
    const category: Category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string) {
    const category = this.categories.find(category => category.name === name);
    return category;
  }
}
