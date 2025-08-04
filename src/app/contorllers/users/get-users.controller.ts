import { IController, ServerRequest, ServerResponse } from "../../../types";
import { users } from "../../models/users/users.model";

export const getUsers: IController = (req: ServerRequest, res: ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
}