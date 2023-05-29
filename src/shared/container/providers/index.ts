import dotenv from "dotenv";
import { container } from "tsyringe";

import { DayjsDateProvider } from "./DateProvider/DayjsDateProvider";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";

dotenv.config();

container.registerInstance<IMailProvider>(
  "MailProvider",
  new EtherealMailProvider(),
);

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.disk],
);
