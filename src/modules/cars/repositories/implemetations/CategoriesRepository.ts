import { Category } from "../../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  public static getInstance(): CategoriesRepository {
    if (!this.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }

  private constructor() {
    this.categories = [];
  }

  findByName(name: string): Category {
    const categoryExists = this.categories.find(
      (category) => category.name === name
    );

    return categoryExists;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });
    this.categories.push(category);
  }
  list(): Category[] {
    return this.categories;
  }
}

export { CategoriesRepository };
