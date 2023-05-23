import { container } from "tsyringe";

import { DayjsDateProvider } from "./DateProvider/DayjsDateProvider";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { EtherealMailProvider } from "./MailProvider/EtherealMailProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";

container.registerInstance<IMailProvider>(
  "MailProvider",
  new EtherealMailProvider(),
);

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);
