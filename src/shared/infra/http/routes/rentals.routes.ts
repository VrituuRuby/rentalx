import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";

import { verifyAuthentication } from "../middleware/verifyAuthentication";

const rentalsRoutes = Router();

const createRentalsController = new CreateRentalController();

rentalsRoutes.post("/", verifyAuthentication, createRentalsController.handle);

export { rentalsRoutes };
