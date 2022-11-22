import { Router } from "express";

import { createCategoryController } from "../cars/useCases/createCategory";
import { listCategoriesController } from "../cars/useCases/listCategories";

const categoriesRoutes = Router();

/* Routes are responsible for getting the data from the user and passing forward or throwing errors. */

categoriesRoutes.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get("/", (req, res) => {
  return listCategoriesController.handle(req, res);
});

export { categoriesRoutes };
