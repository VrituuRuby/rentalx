import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: ICarsRepository;
let specificationsRepository: ISpecificationsRepository;
describe("Create Car Specification", () => {
  beforeEach(() => {
    specificationsRepository = new SpecificationsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository,
    );
  });
  it("Should not be able to add a specification to an inexistent car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_ids = ["123ABC"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_ids,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should be able to add a specification to an existent car", async () => {
    const car = await carsRepository.create({
      name: "Car1",
      brand: "Brand Name",
      category_id: "12903129083921",
      daily_rate: 120,
      description: "Car description",
      fine_amount: 60,
      license_plate: "DEF-5678",
    });

    const specification = await specificationsRepository.create({
      name: "Spec 1",
      description: "Specification description",
    });

    const specifications_ids = [specification.id];
    const { id: car_id } = car;

    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_ids,
    });

    expect(specificationCars).toHaveProperty("specifications");
    expect(specificationCars.specifications.length).toBe(1);
  });
});
