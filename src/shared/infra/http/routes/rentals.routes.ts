import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { ReturnRentalController } from "@modules/rentals/useCases/returnRental/ReturnRentalController";

import { verifyAuthentication } from "../middleware/verifyAuthentication";

const rentalsRoutes = Router();

const createRentalsController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post("/", verifyAuthentication, createRentalsController.handle);
rentalsRoutes.post(
  "/returns/:id",
  verifyAuthentication,
  returnRentalController.handle,
);
rentalsRoutes.get(
  "/user",
  verifyAuthentication,
  listRentalsByUserController.handle,
);

export { rentalsRoutes };
