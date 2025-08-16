import { 
    deleteUserControler, getUsersController, setUserController, updateUserController
 } from "./app/contorllers/users/users.controller";
import { HttpMethod, IRouter } from "./lib/routing/types";

export const routes: IRouter = {
    '/api/users': {
        [HttpMethod.GET]: getUsersController,
        [HttpMethod.POST]: setUserController,
        [HttpMethod.DELETE]: deleteUserControler,
        [HttpMethod.PUT]: updateUserController,
        [HttpMethod.PATCH]: updateUserController,
    }
};
  