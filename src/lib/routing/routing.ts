import { ServerRequest, ServerResponse } from "../../types";
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
        if (path === routePath && Object.hasOwn(routes, method)) {
            routes[method as keyof typeof routes]?.(req, res);
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Route not found' }));
        }
    })
}

export default router;