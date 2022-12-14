import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { deleteFile } from "@utils/file";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
  ) {}
  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];
      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async line => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          deleteFile(file.path);
          resolve(categories);
        })
        .on("error", err => reject(err));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async category => {
      const { name, description } = category;

      const categoryExists = await this.categoriesRepository.findByName(name);

      if (!categoryExists) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoriesUseCase };
