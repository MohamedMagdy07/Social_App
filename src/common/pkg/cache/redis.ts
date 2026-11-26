import Redis from "ioredis";
import {ICacheProvider} from "./cache.interfaces";

interface RedisConfig {
    host: string;
    port: number;
    password?: string;
}

class RedisCacheProvider implements ICacheProvider {
    public redis: Redis;

    constructor(config: RedisConfig) {
        this.redis = new Redis({
            host: config.host,
            port: config.port,
            password: config.password,
            lazyConnect: true,
            maxRetriesPerRequest: 3,
        });
        this.redis.on("error", (err) => {
            console.error(`redis server error: ${err.message}`);
        });
        this.redis.connect().catch((err) => {
            console.error(`failed to connect to redis cache, ${err.message}`);
        });
    }

    async close(): Promise<void> {
        if (this.redis.status === "end") return;
        try {
            await this.redis.quit();
        } catch {
            this.redis.disconnect();
        }
    }

    async set(key: string, value: string, ttl?: number) {
        if (ttl !== undefined && ttl > 0) {
            return await this.redis.set(key, value, "EX", ttl);
        }
        return await this.redis.set(key, value);
    }

    async get(key: string) {
        return await this.redis.get(key);
    }

    async delete(key: string) {
        return await this.redis.del(key);
    }

    async getTtl(key: string) {
        return await this.redis.ttl(key);
    }
}

export default RedisCacheProvider;
