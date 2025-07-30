import { Router } from 'express';
import * as usersController from '../controllers/userController.js';
const usersRouter = Router();

usersRouter.get('/', usersController.usersListGet);
usersRouter.get('/create', usersController.usersCreateGet);
usersRouter.post('/create', usersController.usersCreatePost);
usersRouter.get('/:id/update', usersController.usersUpdateGet);
usersRouter.post('/:id/update', usersController.usersUpdatePost);
usersRouter.post('/:id/delete', usersController.usersDeletePost);

export default usersRouter;
