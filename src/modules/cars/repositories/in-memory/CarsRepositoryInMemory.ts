import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.cars.find(
      car => car.license_plate === license_plate,
    );
    return car;
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      id,
      specifications,
    } as ICreateCarDTO);

    this.cars.push(car);
    return car;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    id?: string,
  ): Promise<Car[]> {
    const available = this.cars.filter(car => {
      if (
        car.available === true ||
        (brand && brand === car.brand) ||
        (category_id && category_id === car.category_id) ||
        (id && id === car.id)
      ) {
        return car;
      }
      return null;
    });
    return available;
  }

  async findById(car_id: string): Promise<Car> {
    const car = await this.cars.find(car => car_id === car.id);
    return car;
  }
}

export { CarsRepositoryInMemory };
