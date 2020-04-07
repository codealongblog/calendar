import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';

interface User {
    _id?: ObjectId;
    uid: string;
    displayName: string;
    photoURL: string;
    email: string;
}

interface UserDocument extends Omit<User, '_id'>, mongoose.Document {}

let UserSchema: mongoose.Schema = new mongoose.Schema({
    uid: { type: String, unique: true },
    displayName: { type: String },
    photoURL: { type: String },
    email: { type: String, unique: true },
});

export { User, UserSchema, UserDocument };
