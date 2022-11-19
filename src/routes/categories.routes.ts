import { Router } from "express";

import { CategoriesRepository } from "../cars/repositories/CategoriesRepository";
import { CreateCategoryService } from "../cars/services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

/* Routes are responsible for getting the data from the user and passing forward or throwing errors. */

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);
  createCategoryService.execute({ name, description });
  res.status(201).send();
});

categoriesRoutes.get("", (req, res) => {
  res.status(200).send(categoriesRepository.list());
});

export { categoriesRoutes };
