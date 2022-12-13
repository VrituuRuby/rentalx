import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { verifyAuthentication } from "../middleware/verifyAuthentication";
import { verifyIsAdmin } from "../middleware/verifyIsAdmin";

const carsRoutes = Router();

const createCarController = new CreateCarController();
carsRoutes.post(
  "/",
  verifyAuthentication,
  verifyIsAdmin,
  createCarController.handle,
);

export { carsRoutes };
