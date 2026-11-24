export interface ICacheProvider {
    set(key: string, value: string, ttl?: number): Promise<string>;

    get(key: string): Promise<string | null>;

    delete(key: string): Promise<number>;

    getTtl(key: string): Promise<number>;
}