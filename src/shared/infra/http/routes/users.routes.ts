import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/Upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

import { verifyAuthentication } from "../middleware/verifyAuthentication";

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

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
