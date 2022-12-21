import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    expected_return_date,
    car_id,
    user_id,
  }: IRequest): Promise<Rental> {
    // Must not be able to register a new rental if there already is a rental of the requested car
    const carIsRented = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );
    if (carIsRented) throw new AppError("Car is already rented");

    // Must not be able to register a new rental if user already has a rented car
    const userHasOngoingRental =
      await this.rentalsRepository.findOpenRentalByUser(user_id);
    if (userHasOngoingRental)
      throw new AppError("User already have a rent in progress");

    // The minium rental time must be 24h
    const dateNow = new Date();
    const msBetweenDates = Math.abs(
      dateNow.getTime() - expected_return_date.getTime(),
    );

    const hoursBetweenDates = msBetweenDates / 1000 / 60 / 60;

    if (hoursBetweenDates < 24)
      throw new AppError("Minium rental time is 24h only");

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });
    return rental;
  }
}

export { CreateRentalUseCase };
