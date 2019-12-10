import * as express from 'express';
import * as mongoose from 'mongoose';
import { UserRoutes } from './models/user/user.routes';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const app = express();
const port = 8080;
const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/calendar';

const serverStarted: Function = async () => {
    console.log(`Yo. I'm listening on ${port}`);
    mongoose.connection.once('open', () => {
        console.log('db opened');
    });
    mongoose.connection.once('error', (err: Error) => {
        console.log(`DB ERROR: ${err}`);
    });
    await mongoose.connect(MONGO_DB_URL);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/users', UserRoutes);

app.get('/', (req : express.Request, resp: express.Response) => {
    resp.send('hello world');

    // UserModel.create({ name: 'Dan theMan' });
});

app.listen(port, async () => {
    serverStarted();
});


