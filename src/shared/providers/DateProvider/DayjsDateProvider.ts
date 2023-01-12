import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "./IDateProvider";

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const utc_start_date = this.convertToUTC(start_date);
    const utc_end_date = this.convertToUTC(end_date);

    return dayjs(utc_end_date).diff(utc_start_date, "hour");
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const utc_start_date = this.convertToUTC(start_date);
    const utc_end_date = this.convertToUTC(end_date);

    return dayjs(utc_end_date).diff(utc_start_date, "day");
  }

  addDays(days: number) {
    return dayjs().add(days, "days").toDate();
  }
}
