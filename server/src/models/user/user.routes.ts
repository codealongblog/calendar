import * as express from 'express';
import { UsersController } from './users.controller';

const router = express.Router();

router.get('/', UsersController.search);
router.get('/:id/', UsersController.get);
router.post('/', UsersController.create);

export { router as UserRoutes };
