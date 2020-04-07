import * as express from 'express';
import { UsersController } from './users.controller';

const router = express.Router();

router.get('/', UsersController.search);
router.get('/:uid/', UsersController.get);
router.post('/', UsersController.create);

export { router as UserRoutes };
