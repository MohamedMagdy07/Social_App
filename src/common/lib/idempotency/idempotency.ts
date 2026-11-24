import {cacheProvider} from "../cache/init";
import {NextFunction, Request, Response} from "express";


export function idempotency(ttl = 3600) {
    return async function (req: Request, res: Response, next: NextFunction) {
        const idempotency = req.headers['idempotency-key'];
        let key = `${req.method}:${req.originalUrl}:${idempotency}`;
        const cached = await cacheProvider.get(key);
        if (cached) {
            res.setHeader('X-Cache', 'HIT');
            return res.json(JSON.parse(cached))
        }
        const ogJson = res.json.bind(res);

        res.json = ( (body):Response => {
            if(res.statusCode >= 200 && res.statusCode < 300) {
                 cacheProvider.set(key, JSON.stringify(body), ttl);
                res.setHeader('X-Cache', 'MISS');
            }
            return ogJson(body);
        })
        next();
    }
}