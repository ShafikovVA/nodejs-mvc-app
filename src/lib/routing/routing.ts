import { ServerRequest, ServerResponse } from "../../types";
import { getRoutingErrors } from "./routing-errors";
import { IRouter } from "./types";

const router = (routes: IRouter, req: ServerRequest, res: ServerResponse) => {
    if (!req.url) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: 'URL is required' }));
        return;
    }
    
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = parsedUrl.pathname;
    const method = req.method?.toUpperCase() || '';

    const routesArray = Object.entries(routes);
    routesArray.forEach(([routePath, routes]) => {
        const error = getRoutingErrors(routes, routePath, path, method);
        if (error) {
            res.writeHead(404);
            res.end(JSON.stringify(error))
        }
        if (path === routePath && Object.hasOwn(routes, method)) {
            routes[method as keyof typeof routes]?.(req, res);
        } 
      
    });
}

export default router;