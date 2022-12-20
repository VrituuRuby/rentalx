import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICreateCarImageDTO {
  id?: string;
  car_id: string;
  image_name: string;
}

interface ICarImagesRepository {
  create({ car_id, image_name, id }: ICreateCarImageDTO): Promise<CarImage>;
}

export { ICarImagesRepository, ICreateCarImageDTO };
