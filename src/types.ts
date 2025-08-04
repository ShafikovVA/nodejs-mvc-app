import http from 'http';

export interface User {
  id: number;
  name: string;
}

export type ServerRequest = http.IncomingMessage;
export type ServerResponse = http.ServerResponse;
export type IController = (req: ServerRequest, res: ServerResponse) => void; 