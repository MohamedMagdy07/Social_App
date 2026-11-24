import {cacheProvider} from "./init";
import {NextFunction, Request, Response} from "express";


export function withCache(ttl = 600) {
    return async (req: Request, res: Response, next: NextFunction) => {

        let key = `${req.method}${req.originalUrl}`;
        const cached = await cacheProvider.get(key);

        if (cached) {
            res.setHeader("X-Cache", "HIT");
            return res.json(JSON.parse(cached));
        }
        const ogResponseJson = res.json.bind(res);
        res.json = ((body): Response => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                cacheProvider.set(key, JSON.stringify(body), ttl);
                res.setHeader("X-Cache", "MISS");
            }
            return ogResponseJson(body);
        })

        next();
    }
}