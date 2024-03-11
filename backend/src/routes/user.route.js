import { Router } from "express";

import { register, login, logout, getprofile, uploadresume } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated ,getprofile);

router.route("/uploadresume").put(isAuthenticated, singleUpload, uploadresume);

export default router;
