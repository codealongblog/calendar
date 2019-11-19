import * as express from 'express';
import { UserController } from './users.controller';

const router = express.Router();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.post('/', UserController.createUser);

export { router as UserRoutes };
