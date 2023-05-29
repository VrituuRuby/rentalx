import { inject, injectable } from "tsyringe";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider,
  ) {}
  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);
    if (!carExists) throw new AppError("Car does not exists");

    images_name.map(async image => {
      await this.carImagesRepository.create({ car_id, image_name: image });
      await this.storageProvider.save(image, "cars");
    });
  }
}

export { UploadCarImagesUseCase };
