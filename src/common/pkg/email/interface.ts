export interface IMailProvider {
    send(email: string, subject: string, body: string): Promise<void>;
}