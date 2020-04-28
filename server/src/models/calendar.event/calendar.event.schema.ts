import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';

interface CalendarEvent {
    _id?: ObjectId,
    ownerUserId: ObjectId,
    name: string,
    startDate: Date,
    endDate: Date,
    description?: string,
    crontab?: string
}

interface CalendarEventDocument extends Omit<CalendarEvent, '_id'>, mongoose.Document {}

let CalendarEventSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String },
    ownerUserId: { type: ObjectId, required: true, ref: 'user' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: false },
    crontab: { type: String, required: false },
});

CalendarEventSchema.virtual('owner', {
    ref: 'user',
    localField: 'ownerUserId',
    foreignField: '_id',
    justOne: true
});

export { CalendarEvent, CalendarEventSchema, CalendarEventDocument };
