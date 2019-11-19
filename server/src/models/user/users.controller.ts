import { User } from "./user.schema";
import * as express from 'express';
import { UserModel } from "./user.model";


class UserController {
    public static async getUsers (req: express.Request, resp: express.Response) : Promise<void> {
        const users: Array<User> = await UserModel.find({}).lean();
        resp.send(users);
    }

    public static async getUser (req: express.Request, resp: express.Response) : Promise<void> {
        const user: User = await UserModel.findById(req.params.id).lean();
        resp.send(user);
    }

    public static async createUser (req: express.Request, resp: express.Response) : Promise<void> {
        const user = req.body;
        const createdUser: User = await UserModel.create(user);
        resp.status(200);
        resp.send(createdUser);
    }
}

export { UserController };
