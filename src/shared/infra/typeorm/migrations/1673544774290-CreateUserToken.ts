import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserToken1673544774290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_tokens",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "refresh_token", type: "varchar" },
          { name: "user_id", type: "uuid" },
          { name: "expire_date", type: "timestamp" },
          { name: "created_at", type: "timestamp", default: "now()" },
        ],
        foreignKeys: [
          {
            name: "FK_user_token",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_tokens");
  }
}
