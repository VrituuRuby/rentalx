import { app } from "app";
import { hash } from "bcryptjs";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 } from "uuid";

import { createConnection } from "@shared/infra/typeorm/index";

let TestDataSource: DataSource;
describe("Create Category Controller", () => {
  beforeAll(async () => {
    TestDataSource = await createConnection();
    await TestDataSource.runMigrations();
    const id = v4();
    const password = await hash("admin", 8);

    await TestDataSource.query(`
    INSERT INTO USERS(id, name, email, password, admin, created_at, driver_license)
      VALUES('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', '1234')
  `);
  });
  afterAll(async () => {
    await TestDataSource.dropDatabase();
    TestDataSource.destroy();
  });
  it("Should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin",
    });

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Supertest name",
        description: "Supertest description",
      })
      .set({ Authorization: `Bearer ${responseToken.body.token}` });
    expect(response.status).toBe(201);
  });
});
