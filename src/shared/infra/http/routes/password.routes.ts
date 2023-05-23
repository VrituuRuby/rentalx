import { Router } from "express";

import { SendForgottenPasswordController } from "@modules/accounts/useCases/sendForgottenPassword/SendForgottenPasswordController";

const passwordRoutes = Router();

const sendForgottenPasswordController = new SendForgottenPasswordController();

passwordRoutes.post("/recover", sendForgottenPasswordController.handle);

export { passwordRoutes };
