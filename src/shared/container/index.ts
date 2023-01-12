import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { CarImagesRepository } from "@modules/cars/infra/typeorm/repositories/CreateCarImagesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { DayjsDateProvider } from "@shared/providers/DateProvider/DayjsDateProvider";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarImagesRepository>(
  "CarImagesRepository",
  CarImagesRepository,
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository,
);

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository,
);

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);
