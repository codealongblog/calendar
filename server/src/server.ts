import * as express from 'express';
import * as mongoose from 'mongoose';
import { UserRoutes } from './models/user/user.routes';
import { CalendarEventRoutes } from './models/calendar.event/calendar.event.routes';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Config } from './config';
import { requestLoggerMiddleware } from './middleware/request.logger.middleware';

const app = express();
const port = 8080;
const MONGO_DB_URL = Config.get("MONGO_DB_URL") || 'mongodb://localhost:27017/calendar';

const serverStarted: Function = async () => {
    console.log(`Yo. I'm listening on ${port}`);
    mongoose.connection.once('open', () => {
        console.log('db opened');
    });
    mongoose.connection.once('error', (err: Error) => {
        console.log(`DB ERROR: ${err}`);
    });
    mongoose.set('useCreateIndex', true);
    await mongoose.connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(requestLoggerMiddleware);

app.use('/users', UserRoutes);
app.use('/calendarEvents', CalendarEventRoutes);

app.listen(port, async () => {
    serverStarted();
});


