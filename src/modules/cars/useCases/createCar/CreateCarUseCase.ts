import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
  ) {}

  async execute(data: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findByLicensePlate(
      data.license_plate,
    );

    if (carExists) {
      throw new AppError("Car already exists");
    }

    await this.carsRepository.create(data);
  }
}

export { CreateCarUseCase };
