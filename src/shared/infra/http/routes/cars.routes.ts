import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listCars/ListAvailableCarsController";

import { verifyAuthentication } from "../middleware/verifyAuthentication";
import { verifyIsAdmin } from "../middleware/verifyIsAdmin";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
  "/",
  verifyAuthentication,
  verifyIsAdmin,
  createCarController.handle,
);
carsRoutes.get("/", listAvailableCarsController.handle);

export { carsRoutes };
