import { IController, ServerRequest, ServerResponse } from "../../../types";
import { parseBody } from "../../../utils/parseBody";
import { IUser } from "../../models/users/types/IUser";
import { 
    addOne as addOneUser, 
    getAll as getUsersData, 
    deleteOne as deleteOneUser, 
    updateOne as updateOneUser,
    patchOne as patchOneUser, 
} from "../../models/users/users.model";

export const getUsersController: IController = async (req: ServerRequest, res: ServerResponse) => {
    try {
        const allUsers = await getUsersData();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(allUsers));
    } catch (error) {
        console.error('Error in getUsers controller:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
}

export const setUserController: IController = async (req: ServerRequest, res: ServerResponse) => {
    try {
        const data = await parseBody(req);
        const newUser = await addOneUser({
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

export const deleteUserControler: IController = async (req: ServerRequest, res: ServerResponse) => {
    try {
        const data = await parseBody(req);
        const deletedUser = await deleteOneUser(data.id);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(deletedUser));
    } catch (error) {
        console.error('Error in deleteUser controller:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
}


export const updateUserController: IController = async (req: ServerRequest, res: ServerResponse) => {
    try {
        const data = await parseBody(req);
        const userData: IUser = {
            id: data.id,
            name: data.name,
        };
        const updateUserData = await updateOneUser(userData);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updateUserData));
    } catch (error) {
        console.error('Error in updateUser controller:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
}

export const patchUserController: IController = async (req: ServerRequest, res: ServerResponse) => {
    try {
        const data = await parseBody(req);
        const userData: IUser = {
            id: data.id,
            name: data.name,
        };
        const patchUserData = await patchOneUser(userData);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(patchUserData));
    } catch (error) {
        console.error('Error in patchUser controller:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
}