import { IncomingMessage, ServerResponse } from 'http';

export declare type ServerRequest = IncomingMessage;
export declare type ServerResponse = ServerResponse; 

export declare type IController = (req: ServerRequest, res: ServerResponse) => void;