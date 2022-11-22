import { Router } from "express";

import { createSpecificationController } from "../cars/useCases/createSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req, res) => {
  return createSpecificationController.handle(req, res);
});

specificationsRoutes.get("/", (req, res) => {
  return res.status(200).send();
});

export { specificationsRoutes };
