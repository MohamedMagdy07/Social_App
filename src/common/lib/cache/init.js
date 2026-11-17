import {RedisCacheProvider} from "../../pkg/cache/redis.ts";
import {env} from "../config/env.js";

export const cacheProvider = new RedisCacheProvider({
    host:env.redis.host,
    port: env.redis.port,
    password: env.redis.password,
});