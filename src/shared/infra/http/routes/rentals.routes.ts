import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ReturnRentalController } from "@modules/rentals/useCases/returnRental/ReturnRentalController";

import { verifyAuthentication } from "../middleware/verifyAuthentication";

const rentalsRoutes = Router();

const createRentalsController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();

rentalsRoutes.post("/", verifyAuthentication, createRentalsController.handle);
rentalsRoutes.post(
  "/returns/:id",
  verifyAuthentication,
  returnRentalController.handle,
);

export { rentalsRoutes };
