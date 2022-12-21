import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../../entities/Rental";

export class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: {
    car_id: string;
    user_id: string;
    expected_return_date: string;
  }): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);
    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(rent => rent.car_id === car_id && !rent.end_date);
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      rent => rent.user_id === user_id && !rent.end_date,
    );
  }
}
