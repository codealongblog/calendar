import * as express from 'express';
import { CalendarEventsController } from './calendar.events.controller';

const router = express.Router();

router.post('/', CalendarEventsController.create);
router.put('/:id', CalendarEventsController.update);
router.get('/', CalendarEventsController.search);
router.delete('/:id', CalendarEventsController.delete);

export { router as CalendarEventRoutes };
