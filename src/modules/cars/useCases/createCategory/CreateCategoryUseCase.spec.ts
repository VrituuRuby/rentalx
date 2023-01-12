import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategory: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description test",
    };

    await createCategory.execute(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("Should not be able to create a category with an existing name", async () => {
    const category = {
      name: "Category Test",
      description: "Category description test",
    };

    await createCategory.execute(category);
    await expect(createCategory.execute(category)).rejects.toEqual(
      new AppError("Category already exists!"),
    );
  });
});
