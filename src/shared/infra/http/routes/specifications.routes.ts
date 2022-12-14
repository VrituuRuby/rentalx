import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { verifyAuthentication } from "@shared/infra/http/middleware/verifyAuthentication";

import { verifyIsAdmin } from "../middleware/verifyIsAdmin";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationsController();

specificationsRoutes.post(
  "/",
  verifyAuthentication,
  verifyIsAdmin,
  createSpecificationController.handle,
);
specificationsRoutes.get("/", listSpecificationController.handle);

export { specificationsRoutes };
