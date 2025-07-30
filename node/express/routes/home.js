import { Router } from 'express';
import { usersListGet } from '../controllers/userController.js';

const router = Router();

router.get('/', usersListGet);

export default router;
