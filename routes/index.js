const express = require("express");
const router = express.Router();
import { register, login, user, address } from "../Controllers";
import userHandler from "../middlewares/userHandler";
import upload from "../config/multer";
import { registerValidate } from "../Validator";

router.post("/register", registerValidate, register);
router.post("/login", Controllers.loginController.login);
router.get("/user", userHandler, Controllers.userController.userdetail);
router.put("/deleteuser", userHandler, Controllers.deleteController.delete);
router.get("/userlist", Controllers.userlist.list);
router.post("/address", userHandler, Controllers.addressController.add_detail);
router.delete("/address", userHandler, Controllers.addressDelete.delete);
router.post("/forgot-password", Controllers.forgotPassword.resetPassword);
router.put(
  "/verify-reset-password",
  userHandler,
  Controllers.verifyResetPassword.verifyPassword
);
router.put("/profile-image", upload, Controllers.profileImage.Images);
router.get("/mobile", Controllers.flipkart.mobile);
router.get("/tshirt", Controllers.snapdeal.tshirt);

export default router;
