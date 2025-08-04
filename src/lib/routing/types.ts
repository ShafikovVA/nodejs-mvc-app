import { IController, ServerRequest, ServerResponse } from "../../types";

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export interface IRoute {
    [HttpMethod.GET]?: IController;
    [HttpMethod.POST]?: IController;
    [HttpMethod.PUT]?: IController;
    [HttpMethod.PATCH]?: IController;
    [HttpMethod.DELETE]?: IController;
}

export interface IRouter {
    [key: string]: IRoute;
}


