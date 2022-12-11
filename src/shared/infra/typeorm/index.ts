import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentalx",
  entities: ["./src/modules/**/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}