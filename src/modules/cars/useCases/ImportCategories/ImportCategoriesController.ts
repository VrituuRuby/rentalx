import { Request, Response } from "express";

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

class ImportCategoriesController {
  constructor(private importCategoriesUseCase: ImportCategoriesUseCase) {}
  handle(request: Request, response: Response) {
    const { file } = request;
    try {
      this.importCategoriesUseCase.execute(file);
      return response.send();
    } catch (Error) {
      return response.status(403).json({ error: Error.message });
    }
  }
}

export { ImportCategoriesController };
