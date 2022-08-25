import csvParse from "csv-parser";
import fs from "fs";
import { Field } from "multer";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../repositories/implemetations/CategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}
  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];

      const stream = fs.createReadStream(file.path);
      const parseFile = csvParse({ headers: ["name", "description"] });
      stream
        .pipe(parseFile)
        .on("data", async (line: IImportCategory) => {
          const { name, description } = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async (category) => {
      const categoryExists = this.categoriesRepository.findByName(
        category.name
      );

      if (!categoryExists) this.categoriesRepository.create(category);
    });
  }
}

export { ImportCategoriesUseCase };
