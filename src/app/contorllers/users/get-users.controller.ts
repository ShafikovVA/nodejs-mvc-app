import { IController, ServerRequest, ServerResponse } from "../../../types";
import { parseBody } from "../../../utils/parseBody";
import { users, addUser } from "../../models/users/users.model";

export const getUsers: IController = async (req: ServerRequest, res: ServerResponse) => {
    try {
        const allUsers = await users();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(allUsers));
    } catch (error) {
        console.error('Error in getUsers controller:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
}

export const setUser: IController = async (req: ServerRequest, res: ServerResponse) => {
    try {
        const data = await parseBody(req);
        const newUser = await addUser({
            name: data.name,
        });
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
    } catch (error) {
        console.error('Error in setUser controller:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
}