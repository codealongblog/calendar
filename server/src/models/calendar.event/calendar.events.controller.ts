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

    public static async update (req: express.Request, resp: express.Response) : Promise<void> {
        let calendarEvent: CalendarEvent;
        try {
            calendarEvent = await CalendarEventModel.findByIdAndUpdate(req.params.id, req.body);
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
        try {
            results = await CalendarEventModel.find({userId: req.query.userId, startDate: { $gte: new Date(req.query.startDate) }, endDate: { $lte: new Date(req.query.endDate)} });
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
            await CalendarEventModel.findByIdAndDelete(req.params.id);
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
