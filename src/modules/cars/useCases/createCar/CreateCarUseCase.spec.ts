import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCar: CreateCarUseCase;
let carsRepositoryInMemory: ICarsRepository;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCar = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("Should be possible to create a new car", async () => {
    const car = await createCar.execute({
      name: "Car Name",
      brand: "Brand Name",
      category_id: "12903129083921",
      daily_rate: 120,
      description: "Car description",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });
    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a new car with an existing license plate", async () => {
    expect(async () => {
      const car = {
        name: "Car1",
        brand: "Brand Name",
        category_id: "12903129083921",
        daily_rate: 120,
        description: "Car description",
        fine_amount: 60,
        license_plate: "DEF-5678",
      };

      const car2 = {
        name: "Car2",
        brand: "Brand2 Name",
        category_id: "12903129083921",
        daily_rate: 120,
        description: "Car2 description",
        fine_amount: 60,
        license_plate: "DEF-5678",
      };
      await createCar.execute(car);
      await createCar.execute(car2);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a car with available default as true", async () => {
    const car = await createCar.execute({
      name: "Car1",
      brand: "Brand Name",
      category_id: "12903129083921",
      daily_rate: 120,
      description: "Car description",
      fine_amount: 60,
      license_plate: "ABCD-1234",
    });

    await expect(car.available).toBe(true);
  });
});
