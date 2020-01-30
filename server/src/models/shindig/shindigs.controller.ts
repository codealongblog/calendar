import * as express from 'express';
import { Shindig } from "./shindig.schema";
import { ShindigModel } from "./shindig.model";


class ShindigsController {

    public static async create (req: express.Request, resp: express.Response) : Promise<void> {
        let shindig: Shindig;
        try {
            shindig = await ShindigModel.create(req.body);
            resp.status(200);
            resp.send(shindig);
        } catch (err) {
            console.log(err);
            resp.status(500);
            resp.end();
        }
    }

    public static async update (req: express.Request, resp: express.Response) : Promise<void> {
        let shindig: Shindig;
        try {
            shindig = await ShindigModel.findByIdAndUpdate(req.params.id, req.body);
            resp.status(200);
            resp.send(shindig);
        } catch (err) {
            console.log(err);
            resp.status(500);
            resp.end();
        }
    }

    public static async search ( req: express.Request, resp: express.Response) : Promise<void> {
        let results: Array<Shindig>;
        try {
            results = await ShindigModel.find({userId: req.query.userId, startDate: { $gte: new Date(req.query.startDate) }, endDate: { $lte: new Date(req.query.endDate)} });
            resp.status(200);
            resp.send(results);
        } catch (err) {
            console.log(err);
            resp.status(500);
            resp.end();
        }

    }
}

export { ShindigsController };
