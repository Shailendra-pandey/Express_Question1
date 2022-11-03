const express = require("express");
const router = express.Router();
import { register, login, user, address, profileImage, passwordReset, flipkart, snapdeal } from "../Controllers";
import userHandler from "../middlewares/userHandler";
import upload from "../config/multer";
import { registerValidate, loginValidator, addressValidator, passwordValidate } from "../Validator";

router.post("/register", registerValidate, register);
router.post("/login", loginValidator, login);
router.get("/user", userHandler, user.userdetail);
router.put("/deleteuser", userHandler, user.deleteUser);
router.get("/userlist", user.AllUsers);
router.post("/address", userHandler, addressValidator, address.add_address);
router.delete("/address", userHandler, address.delete_address);
router.post("/forgot-password", passwordReset.passwordResetToken);
router.put(
  "/verify-reset-password",
  userHandler, passwordValidate,
  passwordReset.verifyResetPasswordToken);
router.put("/profile-image", upload, profileImage);
router.get("/mobile", flipkart);
router.get("/tshirt", snapdeal);

export default router;
