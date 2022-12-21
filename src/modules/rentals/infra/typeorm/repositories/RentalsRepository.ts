import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppDataSource } from "@shared/infra/typeorm";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository = AppDataSource.getRepository(Rental);

  create({
    car_id,
    user_id,
    expected_return_date,
  }: {
    car_id: any;
    user_id: any;
    expected_return_date: any;
  }): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findOpenRentalByCar(car_id: any): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
  findOpenRentalByUser(user_id: any): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
}
