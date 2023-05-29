import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfilerUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

import { verifyAuthentication } from "../middleware/verifyAuthentication";

const uploadAvatar = multer(uploadConfig);

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
  "/avatar",
  verifyAuthentication,
  uploadAvatar.single("file"),
  updateUserAvatarController.handle,
);

usersRoutes.get("/profile", verifyAuthentication, profileUserController.handle);

export { usersRoutes };
