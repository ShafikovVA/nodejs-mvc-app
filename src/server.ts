import http from 'http';
import router from './lib/routing/routing';
import { HttpMethod, IRouter } from './lib/routing/types';

const port: number = 3000;

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => { 
  const routes: IRouter = {
    '/api/users': {
      [HttpMethod.GET]: (_, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify({message: 'asdasd'}));
      }
    }
  };
  
  router(routes, req, res)
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); 