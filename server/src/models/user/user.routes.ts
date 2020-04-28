import * as express from 'express';
import { UsersController } from './users.controller';

const router = express.Router();

router.get('/', UsersController.search);
router.post('/:uid', UsersController.create);

export { router as UserRoutes };
