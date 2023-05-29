import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

import { verifyAuthentication } from "../middleware/verifyAuthentication";

const uploadAvatar = multer(uploadConfig);

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
  "/avatar",
  verifyAuthentication,
  uploadAvatar.single("file"),
  updateUserAvatarController.handle,
);

export { usersRoutes };
