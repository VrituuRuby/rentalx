import { hash } from "bcryptjs";

import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepository: IRentalsRepository;
let createRentalUseCase: CreateRentalUseCase;
describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository);
  });
  it("Should be able to register a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "123123",
      user_id: "abcabc",
      expected_return_date: new Date(2022, 11, 25),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("Should not be able to register a new rental if there already is a rental of the requested car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "123123",
        user_id: "abcabc",
        expected_return_date: new Date(2022, 11, 25),
      });

      await createRentalUseCase.execute({
        car_id: "123123",
        user_id: "abcdef",
        expected_return_date: new Date(2022, 11, 25),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should not be able to register a new rental if user already has a rented car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "123456",
        user_id: "abcabc",
        expected_return_date: new Date(2022, 11, 25),
      });

      await createRentalUseCase.execute({
        car_id: "456123",
        user_id: "abcabc",
        expected_return_date: new Date(2022, 11, 25),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should not be able to register a new rental if rent time is less than 24h", async () => {
    await createRentalUseCase.execute({
      car_id: "123456",
      user_id: "abcabc",
      expected_return_date: new Date(
        new Date().getTime() + new Date("12:00:00").getTime(),
      ),
    });
  });
});
