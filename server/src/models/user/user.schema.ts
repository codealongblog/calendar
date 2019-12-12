import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';

interface User {
    _id?: ObjectId,
    name: string
}

interface UserDocument extends Omit<User, '_id'>, mongoose.Document {}

let UserSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, unique: true }
});

export { User, UserSchema, UserDocument };
