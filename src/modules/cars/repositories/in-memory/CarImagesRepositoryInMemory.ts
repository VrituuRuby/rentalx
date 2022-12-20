import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";

import {
  ICarImagesRepository,
  ICreateCarImageDTO,
} from "../ICarImagesRepository";

class CarImagesRepositoryInMemory implements ICarImagesRepository {
  private carImages: CarImage[] = [];
  async create({
    car_id,
    image_name,
    id,
  }: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = new CarImage();

    Object.assign(carImage, { car_id, image_name, id } as ICreateCarImageDTO);
    this.carImages.push(carImage);
    return carImage;
  }
}

export { CarImagesRepositoryInMemory };
