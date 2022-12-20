import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listCars/ListAvailableCarsController";

import { verifyAuthentication } from "../middleware/verifyAuthentication";
import { verifyIsAdmin } from "../middleware/verifyIsAdmin";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

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

export { carsRoutes };
