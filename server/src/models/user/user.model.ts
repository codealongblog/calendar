import { UserSchema, User, UserDocument } from './user.schema';
import * as mongoose from 'mongoose';

const UserModel: mongoose.Model<UserDocument> = mongoose.model('user', UserSchema);

export { UserModel };
