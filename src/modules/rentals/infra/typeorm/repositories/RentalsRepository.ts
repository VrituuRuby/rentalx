import { IsNull, Repository } from "typeorm";

import {
  ICreateRentalDTO,
  IRentalsRepository,
} from "@modules/rentals/repositories/IRentalsRepository";
import { AppDataSource } from "@shared/infra/typeorm";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental> = AppDataSource.getRepository(Rental);

  async create({
    car_id,
    expected_return_date,
    user_id,
    id,
    total,
    end_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      total,
      end_date,
    });
    await this.repository.save(rental);
    return rental;
  }

  async findRentalById(rental_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ where: { id: rental_id } });
    return rental;
  }

  async findRentalsByUserId(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: { car: true },
    });
    return rentals;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { car_id, end_date: IsNull() },
    });
    return rental;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { user_id, end_date: IsNull() },
    });
    return rental;
  }
}

export { RentalsRepository };
