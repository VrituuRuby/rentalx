import { hash } from "bcryptjs";
import { v4 } from "uuid";

import { AppDataSource, createConnection } from ".";

async function create() {
  await createConnection("localhost");
  const id = v4();
  const password = await hash("admin", 8);

  await AppDataSource.query(`
    INSERT INTO USERS(id, name, email, password, admin, created_at, driver_license)
      VALUES('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', '1234')
  `);

  await AppDataSource.destroy();
}

create().then(() => console.log("Created admin seed"));
