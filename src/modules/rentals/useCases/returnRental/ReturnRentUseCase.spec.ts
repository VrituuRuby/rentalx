import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { DayjsDateProvider } from "@shared/providers/DateProvider/DayjsDateProvider";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";

import { ReturnRentalUseCase } from "./ReturnRentalUseCase";

let returnRentUseCase: ReturnRentalUseCase;
let rentalsRepository: IRentalsRepository;
let carsRepository: ICarsRepository;
let dateProvider: IDateProvider;
describe("Return Rent UseCase", () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    carsRepository = new CarsRepositoryInMemory();
    returnRentUseCase = new ReturnRentalUseCase(
      rentalsRepository,
      carsRepository,
      dateProvider,
    );
  });
  it("Should be able to return a rental by id and user_id", async () => {
    const car = await carsRepository.create({
      brand: "brand",
      category_id: "category",
      daily_rate: 100,
      description: "car",
      fine_amount: 50,
      license_plate: "abc",
      name: "Bob",
    });

    const rental = await rentalsRepository.create({
      car_id: car.id,
      expected_return_date: new Date("2023-02-5 18:00:00"),
      user_id: "user_id",
    });

    returnRentUseCase.execute({ id: rental.id, user_id: "user_id" });
  });
});
