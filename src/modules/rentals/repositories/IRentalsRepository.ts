import { Rental } from "../infra/typeorm/entities/Rental";

export interface ICreateRentalDTO {
  start_date?: Date;
  car_id: string;
  user_id: string;
  expected_return_date: Date;
  total?: number;
  id?: string;
  end_date?: Date;
}

interface IRentalsRepository {
  create({
    car_id,
    expected_return_date,
    user_id,
    total,
    id,
    end_date,
  }: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findRentalById(rental_id: string): Promise<Rental>;
  findRentalsByUserId(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository };
