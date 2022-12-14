import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "@modules/cars/useCases/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

import { verifyAuthentication } from "../middleware/verifyAuthentication";
import { verifyIsAdmin } from "../middleware/verifyIsAdmin";

const upload = multer({ dest: "./tmp" });

const categoriesRoutes = Router();

// CONTROLLERS
const createCategoryController = new CreateCategoryController();
const importCategoriesController = new ImportCategoriesController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  "/",
  verifyAuthentication,
  verifyIsAdmin,
  createCategoryController.handle,
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  verifyAuthentication,
  verifyIsAdmin,
  importCategoriesController.handle,
);

export { categoriesRoutes };
