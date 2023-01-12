import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

dayjs.extend(utc);

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    expected_return_date,
    car_id,
    user_id,
  }: IRequest): Promise<Rental> {
    const miniumRentalHour = 24;
    const carIsRented = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );
    if (carIsRented) throw new AppError("Car is already rented");

    const userHasOngoingRental =
      await this.rentalsRepository.findOpenRentalByUser(user_id);
    if (userHasOngoingRental)
      throw new AppError("User already have a rent in progress");

    const returnDateFormatted = dayjs(expected_return_date)
      .utc()
      .local()
      .format();
    const dateNowFormatted = dayjs().utc().local().format();

    const diffInHours = dayjs(returnDateFormatted).diff(dateNowFormatted, "h");

    if (diffInHours < miniumRentalHour)
      throw new AppError(
        `Rental return date must be at least ${miniumRentalHour}h`,
      );
    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
