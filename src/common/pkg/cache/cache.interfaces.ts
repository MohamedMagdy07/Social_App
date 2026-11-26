export interface ICacheProvider {

    close(): Promise<void>
    set(key: string, value: string, ttl?: number,secondsToken?:string): Promise<string>;

    get(key: string): Promise<string | null>;

    delete(key: string): Promise<number>;

    getTtl(key: string): Promise<number>;
}