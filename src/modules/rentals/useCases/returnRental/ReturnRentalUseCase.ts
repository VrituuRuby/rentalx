/*
 * Infomrar data que foi devolvido;
 * Calcular preço total com base nos dias e preço da diária do carro
 * (Caso seja retornado em menos de 24h cobrar o preço da diária inteira)
 * Alterar car.available para True
 */

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";

interface IRequest {
  id: string;
  user_id: string;
}

dayjs.extend(utc);

@injectable()
export class ReturnRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
  ) {}

  async execute({ id, user_id }: IRequest) {
    const rental = await this.rentalRepository.findRentalById(id);
    if (!rental) throw new AppError("Rental not found", 404);

    let total = 0;
    const car = await this.carsRepository.findById(rental.car_id);

    const nowDate = this.dateProvider.dateNow();
    let daily = this.dateProvider.compareInDays(rental.start_date, nowDate);
    console.log(`daily: ${daily}`);

    if (daily <= 0) daily = 1;

    const delayInDays = this.dateProvider.compareInDays(
      rental.expected_return_date,
      nowDate,
    );
    if (delayInDays > 0) total += delayInDays * car.fine_amount;
    console.log(delayInDays);

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.updated_at = this.dateProvider.dateNow();
    rental.total = total;

    await this.carsRepository.updateAvailable(car.id, true);
    await this.rentalRepository.create(rental);

    return rental;
  }
}
