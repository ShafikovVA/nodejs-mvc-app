import { IncomingMessage, ServerResponse as ServerResponseHttpType } from 'http';

export declare type ServerRequest = IncomingMessage;
export declare type ServerResponse = ServerResponseHttpType; 

export declare type IController = (req: ServerRequest, res: ServerResponse) => void;