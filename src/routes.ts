import { getUsers, setUser } from "./app/contorllers/users/get-users.controller";
import { HttpMethod, IRouter } from "./lib/routing/types";

export const routes: IRouter = {
    '/api/users': {
        [HttpMethod.GET]: getUsers,
        [HttpMethod.POST]: setUser,
    }
};
  