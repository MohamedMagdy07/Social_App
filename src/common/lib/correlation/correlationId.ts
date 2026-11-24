import {NextFunction, Request, Response} from "express";

export function correlationId(req: Request, res: Response, next: NextFunction) {
    const id = crypto.randomUUID()
    req.correlationId = id;
    res.setHeader("X-Correlation-Id", id);
    next()
}
