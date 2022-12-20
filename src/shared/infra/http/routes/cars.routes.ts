import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/Upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

import { verifyAuthentication } from "../middleware/verifyAuthentication";
import { verifyIsAdmin } from "../middleware/verifyIsAdmin";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post(
  "/",
  verifyAuthentication,
  verifyIsAdmin,
  createCarController.handle,
);

carsRoutes.post(
  "/specifications/:id",
  verifyAuthentication,
  verifyIsAdmin,
  createCarSpecificationController.handle,
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
  "/images/:id",
  verifyAuthentication,
  verifyIsAdmin,
  upload.array("images"),
  uploadCarImagesController.handle,
);

export { carsRoutes };
