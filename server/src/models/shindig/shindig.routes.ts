import * as express from 'express';
import { ShindigsController } from './shindigs.controller';

const router = express.Router();

router.post('/', ShindigsController.create);
router.get('/', ShindigsController.search);

export { router as ShindigRoutes };
