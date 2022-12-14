import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: ICarsRepository;

describe("List all available cars", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });
  it("Should be able to list all available cars only", async () => {
    const car = await carsRepository.create({
      name: "Available Car",
      description: "Available car description",
      daily_rate: 120,
      license_plate: "DFG-1212",
      fine_amount: 80,
      brand: "car_brand",
      category_id: "44700c9f-d80e-4893-bdf0-eaf31fe7e9c7",
    });

    const response = await listCarsUseCase.execute({});
    expect(response).toEqual([car]);
  });
  it("Should be able do list all available cars by name", async () => {
    const car = await carsRepository.create({
      name: "Car Name Test",
      description: "Available car description",
      daily_rate: 120,
      license_plate: "ABC-1111",
      fine_amount: 80,
      brand: "car_brand_name_test",
      category_id: "44700c9f-d80e-4893-bdf0-eaf31fe7e9c7",
    });

    const cars = await listCarsUseCase.execute({ name: "Car Name Test" });
    expect(cars).toEqual([car]);
  });
  it("Should be able do list all available cars by category id", async () => {
    const car = await carsRepository.create({
      name: "Car Category ID Test",
      description: "Available car description",
      daily_rate: 120,
      license_plate: "ABC-1112",
      fine_amount: 80,
      brand: "car_id_test",
      category_id: "Category ID Test",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "Category ID Test",
    });
    expect(cars).toEqual([car]);
  });
  it("Should be able do list all available cars by brand", async () => {
    const car = await carsRepository.create({
      name: "Car Brand Test",
      description: "Available car description",
      daily_rate: 120,
      license_plate: "ABC-1112",
      fine_amount: 80,
      brand: "car_brand_test",
      category_id: "44700c9f-d80e-4893-bdf0-eaf31fe7e9c7",
    });

    const cars = await listCarsUseCase.execute({ brand: "Car Brand Test" });
    expect(cars).toEqual([car]);
  });
});
