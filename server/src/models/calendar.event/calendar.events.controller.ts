import * as express from 'express';
import { CalendarEvent } from "./calendar.event.schema";
import { CalendarEventModel } from "./calendar.event.model";


class CalendarEventsController {

    public static async create (req: express.Request, resp: express.Response) : Promise<void> {
        let calendarEvent: CalendarEvent;
        try {
            calendarEvent = await CalendarEventModel.create(req.body);
            resp.status(200);
            resp.send(calendarEvent);
        } catch (err) {
            console.log(err);
            resp.status(500);
            resp.end();
        }
    }

    public static async get (req: express.Request, resp: express.Response) : Promise<void> {
        let calendarEvent: CalendarEvent;

        try {
            calendarEvent = await CalendarEventModel.findById(req.params.id).populate('owner', '_id displayName photoURL email').lean();
            resp.status(200);
            resp.send(calendarEvent);
        } catch (err) {
            console.log(err);
            resp.status(500);
            resp.end();
        }
    }

    public static async update (req: express.Request, resp: express.Response) : Promise<void> {
        let calendarEvent: CalendarEvent;
        try {
            calendarEvent = await CalendarEventModel.findByIdAndUpdate(req.params.id, req.body).lean();
            resp.status(200);
            resp.send(calendarEvent);
        } catch (err) {
            console.log(err);
            resp.status(500);
            resp.end();
        }
    }

    public static async search ( req: express.Request, resp: express.Response) : Promise<void> {
        let results: Array<CalendarEvent>;
        let ownerUserId: string = req.query.ownerUserId as string;
        let startDate: Date = new Date(req.query.startDate as string);
        let endDate: Date = new Date(req.query.endDate as string);
        try {
            results = await CalendarEventModel.find({ownerUserId: ownerUserId, startDate: { $gte: startDate }, endDate: { $lte: endDate} }).lean();
            resp.status(200);
            resp.send(results);
        } catch (err) {
            console.log(err);
            resp.status(500);
            resp.end();
        }

    }

    public static async delete ( req: express.Request, resp: express.Response) : Promise<void> {
        try {
            await CalendarEventModel.findByIdAndDelete(req.params.id).lean();
            resp.status(204);
            resp.end();
        } catch (err) {
            console.log(err);
            resp.status(500);
            resp.end();
        }
    }
}

export { CalendarEventsController };
