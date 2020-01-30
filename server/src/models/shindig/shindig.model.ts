import * as mongoose from 'mongoose';
import { ShindigSchema, ShindigDocument } from './shindig.schema';

const ShindigModel: mongoose.Model<ShindigDocument> = mongoose.model('shindig', ShindigSchema);

export { ShindigModel };
