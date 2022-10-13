const express = require('express');
const router = express.Router();
import { registerController } from '../Controllers'

router.post('/register', registerController.register )


export default router;