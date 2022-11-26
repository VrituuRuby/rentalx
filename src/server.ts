import express from "express";

import "reflect-metadata";
import "./shared/container";
import { createConnection } from "./database";
import { router } from "./routes";

createConnection();

const app = express();

app.use(express.json());

app.use(router);

app.listen(3333, () => console.log("Server running at 3333 port"));
