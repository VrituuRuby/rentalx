import { Rental } from "../infra/typeorm/entities/Rental";

export interface ICreateRentalDTO {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

interface IRentalsRepository {
  create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
