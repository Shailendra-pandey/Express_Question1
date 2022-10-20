const express = require('express');
const router = express.Router();
import Controllers from '../Controllers';
import userHandler from '../middlewares/userHandler';
import upload from '../config/multer'

router.post('/register', Controllers.registerController.register);
router.post('/login', Controllers.loginController.login);
router.get('/user', userHandler, Controllers.userController.userdetail);
router.put('/deleteuser', userHandler, Controllers.deleteController.delete);
router.get('/userlist', Controllers.userlist.list);
router.post('/address', userHandler, Controllers.addressController.add_detail);
router.delete('/address', userHandler, Controllers.addressDelete.delete);
router.post('/forgot-password', Controllers.forgotPassword.resetPassword);
router.put('/verify-reset-password', userHandler, Controllers.verifyResetPassword.verifyPassword);
router.put('/profile-image',upload, Controllers.profileImage.Images)


export default router;