import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "../modules/cars/useCases/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const upload = multer({ dest: "./tmp" });

const categoriesRoutes = Router();

// CONTROLLERS
const createCategoryController = new CreateCategoryController();
const importCategoriesController = new ImportCategoriesController();
const listCategoriesContoller = new ListCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesContoller.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoriesController.handle,
);

export { categoriesRoutes };
