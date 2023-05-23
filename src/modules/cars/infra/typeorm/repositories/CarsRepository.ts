import { Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppDataSource } from "@shared/infra/typeorm";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async updateAvailable(car_id: string, available: boolean): Promise<Car> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id", { id: car_id })
      .execute();
    const car = await this.repository.findOne({ where: { id: car_id } });
    return car;
  }

  async findById(car_id: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { id: car_id } });
    return car;
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);
    await this.repository.save(car);
    return car;
  }

  async listAll(): Promise<Car[]> {
    const all = await this.repository.find();
    return all;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { license_plate } });
    return car;
  }

  async findAvailable(
    category_id?: string,
    name?: string,
    brand?: string,
  ): Promise<Car[]> {
    const carQuery = await this.repository
      .createQueryBuilder("car")
      .where("car.available = :available", { available: true });

    if (category_id) {
      carQuery.andWhere("car.category_id = :category_id", { category_id });
    }
    if (name) {
      carQuery.andWhere("car.name = :name", { name });
    }
    if (brand) {
      carQuery.andWhere("car.brand = :brand", { brand });
    }

    const available = await carQuery.getMany();
    return available;
  }
}

export { CarsRepository };
