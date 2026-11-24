import Redis from "ioredis";
import {ICacheProvider} from "./cache.interfaces";

interface RedisConfig {
    host: string;
    port: number;
    password: string;
}

class RedisCacheProvider implements ICacheProvider {
    public redis :Redis;

    constructor(config :RedisConfig) {
        this.redis = new Redis({
            host: config.host,
            port: config.port,
            password: config.password,
            lazyConnect: true,
            maxLoadingRetryTime: 3,

        });
         this.redis.on("error", (err) => {console.error(`redis server error: ${err.message}`)});
        this.redis.connect().catch((err) => {console.error(`failed to connect to redis cache , ${err.message}`)});
    }

    async set(key:string, value:string,ttl:number) {
        return await this.redis.set(key, value,"EX",ttl);
    }

    async get(key:string) {
        return await this.redis.get(key);
    }

    async delete(key:string) {
        return await this.redis.del(key);
    }

    async getTtl(key:string) {
        return await this.redis.ttl(key);
    }
}

export default RedisCacheProvider