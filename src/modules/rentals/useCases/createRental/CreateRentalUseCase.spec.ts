import dayjs from "dayjs";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

function addHours(date: Date, hours: number): Date {
  return new Date(date.setHours(date.getHours() + hours));
}

let rentalsRepository: IRentalsRepository;
let createRentalUseCase: CreateRentalUseCase;
let carsRepository: ICarsRepository;
describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      carsRepository,
    );
  });
  it("Should be able to create a new rental", async () => {
    const car = await carsRepository.create({
      brand: "brand name",
      category_id: "1234",
      daily_rate: 100,
      description: "Car desc.",
      fine_amount: 50,
      license_plate: "abc-1234",
      name: "Car",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "abcabc",
      expected_return_date: dayjs().add(24, "h").toDate(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("Should not be able to register a new rental if there already is a rental of the requested car", async () => {
    const car = await carsRepository.create({
      brand: "brand name",
      category_id: "1234",
      daily_rate: 100,
      description: "Car desc.",
      fine_amount: 50,
      license_plate: "abc-1234",
      name: "Car",
    });
    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "abcabc",
      expected_return_date: addHours(new Date(), 24),
    });
    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: "abcdef",
        expected_return_date: addHours(new Date(), 24),
      }),
    ).rejects.toEqual(new AppError("Car is already rented"));
  });
  it("Should not be able to register a new rental if user already has a rented car", async () => {
    const car = await carsRepository.create({
      brand: "brand name",
      category_id: "1234",
      daily_rate: 100,
      description: "Car desc.",
      fine_amount: 50,
      license_plate: "abc-1234",
      name: "Car",
    });
    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "abcabc",
      expected_return_date: addHours(new Date(), 24),
    });
    await expect(
      createRentalUseCase.execute({
        car_id: "other-car",
        user_id: "abcabc",
        expected_return_date: addHours(new Date(), 24),
      }),
    ).rejects.toEqual(new AppError("User already have a rent in progress"));
  });
  it("Should not be able to register a new rental if rent time is less than 24h", async () => {
    const car = await carsRepository.create({
      brand: "brand name",
      category_id: "1234",
      daily_rate: 100,
      description: "Car desc.",
      fine_amount: 50,
      license_plate: "abc-1234",
      name: "Car",
    });
    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: "abcabc",
        expected_return_date: addHours(new Date(), 12),
      }),
    ).rejects.toEqual(new AppError("Rental return date must be at least 24h"));
  });
});
