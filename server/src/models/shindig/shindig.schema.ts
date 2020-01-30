import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';

interface Shindig {
    _id?: ObjectId,
    userId: ObjectId,
    name: string,
    startDate: Date,
    endDate: Date,
    description?: string,
    crontab?: string
}

interface ShindigDocument extends Omit<Shindig, '_id'>, mongoose.Document {}

let ShindigSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String },
    userId: { type: ObjectId, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: false },
    crontab: { type: String, required: false },
});

export { Shindig, ShindigSchema, ShindigDocument };
