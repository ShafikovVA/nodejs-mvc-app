import type { IGetRoutingErrors, IHttpError } from "./types";

export const getRoutingErrors: IGetRoutingErrors = (routes, routePath, path, method) => {
    switch (true) {
        case path !== routePath:
            return { code: 404, message: 'Route not found' };
        case path === routePath && Object.hasOwn(routes, method): 
            return ({ code: 405, message: 'Method is not allowed' } as IHttpError);
        default: 
            return undefined;
    }
}
