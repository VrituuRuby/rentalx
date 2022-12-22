import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

dayjs.extend(utc);

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    expected_return_date,
    car_id,
    user_id,
  }: IRequest): Promise<Rental> {
    const miniumRentalHour = 24;
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
    const returnDateFormatted = dayjs(expected_return_date)
      .utc()
      .local()
      .format();
    const dateNowFormatted = dayjs().utc().local().format();

    const diffInHours = dayjs(returnDateFormatted).diff(dateNowFormatted, "h");

    if (diffInHours < miniumRentalHour)
      throw new AppError(
        `"Rental return date must be at least ${miniumRentalHour}h"`,
      );
    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });
    return rental;
  }
}

export { CreateRentalUseCase };
