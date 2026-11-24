import type {IUserPayload} from "./userPayload.interface";

declare global {
    namespace Express {
        interface Request {
            user?: IUserPayload;
            correlationId?: string;
        }
    }
}