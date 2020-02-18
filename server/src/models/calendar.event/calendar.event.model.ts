import * as mongoose from 'mongoose';
import { CalendarEventSchema, CalendarEventDocument } from './calendar.event.schema';

const CalendarEventModel: mongoose.Model<CalendarEventDocument> = mongoose.model('calendarEvent', CalendarEventSchema);

export { CalendarEventModel };
