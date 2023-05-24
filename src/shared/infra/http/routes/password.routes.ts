import { Router } from "express";

import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/ResetPasswordController";
import { SendForgottenPasswordController } from "@modules/accounts/useCases/sendForgottenPassword/SendForgottenPasswordController";

const passwordRoutes = Router();

const sendForgottenPasswordController = new SendForgottenPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post("/recover", sendForgottenPasswordController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };
