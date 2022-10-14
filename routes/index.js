const express = require('express');
const router = express.Router();
import { registerController, loginController, userController, deleteController, userlist } from '../Controllers'
import userHandler from '../middlewares/userHandler';

router.post('/register', registerController.register );
router.post('/login', loginController.login);
router.get('/user', userHandler, userController.userdetail);
router.put('/deleteuser', userHandler, deleteController.delete);
router.get('/userlist', userlist.list);


export default router;