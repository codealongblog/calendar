import { User } from "./user.schema";
import * as express from 'express';
import { UserModel } from "./user.model";


class UsersController {

    public static async search (req: express.Request, resp: express.Response) : Promise<void> {
        if (req.query && req.query.uid) {
            let user: User;
            try {
                user = await UserModel.findOne({uid: req.query.uid}).lean();
                if (user) {
                    resp.send(user);
                } else {
                    resp.status(404);
                    resp.end();
                }
            } catch (err) {
                console.log(err);
                resp.status(500);
                resp.end();
            }
        } else {
            resp.status(400);
            resp.end();
        }
    }

    public static async create (req: express.Request, resp: express.Response) : Promise<void> {
        const user = req.body;
        let createdUser: User;
        try {
            console.log('heres my user:', user);
            createdUser = await UserModel.findOneAndUpdate({ uid: req.params.uid }, user, { new: true, upsert: true });
            resp.status(200);
            resp.send(createdUser);
        } catch (err) {
            console.log(err);
            resp.status(500);
            resp.end();
        }
    }
}

export { UsersController };
