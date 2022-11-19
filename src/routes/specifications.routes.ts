import { Router } from "express";

import { SpecificationsRepository } from "../cars/repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../cars/services/CreateSpecificationService";

export const specificationsRoutes = Router();
const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createSpecificationService = new CreateSpecificationService(
    specificationsRepository,
  );
  createSpecificationService.execute({ name, description });
  return res.status(201).send();
});

specificationsRoutes.get("/", (req, res) => {
  const specifications = specificationsRepository.list();

  return res.status(200).send(specifications);
});
