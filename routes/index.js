const express = require('express');
const router = express.Router();
import Controllers from '../Controllers';
import userHandler from '../middlewares/userHandler';

router.post('/register', Controllers.registerController.register);
router.post('/login', Controllers.loginController.login);
router.get('/user', userHandler, Controllers.userController.userdetail);
router.put('/deleteuser', userHandler, Controllers.deleteController.delete);
router.get('/userlist', Controllers.userlist.list);
router.post('/address', userHandler, Controllers.addressController.add_detail);


export default router;