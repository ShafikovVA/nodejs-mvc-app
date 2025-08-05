import dotenv from 'dotenv';
import http from 'http';
import router from './lib/routing/routing';
import { routes } from './routes';

dotenv.config();
const port: number = 3000;

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => { 
  router(routes, req, res)
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); 