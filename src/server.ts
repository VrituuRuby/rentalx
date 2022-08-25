import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server is running at port 3333"));
