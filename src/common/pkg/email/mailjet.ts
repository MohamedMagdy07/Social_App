import Mailjet from 'node-mailjet';
import {IMailProvider} from "./interface";

interface IMailJetConfig{
    apiKey:string;
    apiSecret:string;
    fromEmail:string;
    fromName:string;
}

export class MailjetProvider implements IMailProvider {

    private client:Mailjet;
    private readonly fromEmail ;
    private readonly fromName;

    constructor(config:IMailJetConfig) {
        this.client = new Mailjet({
            apiKey: config.apiKey,
            apiSecret: config.apiSecret,
        });
        this.fromEmail = config.fromEmail;
        this.fromName = config.fromName;
    }


    async send(email:string, subject:string, body:string) {
        try {
            await this.client.post('send', {version: 'v3.1'}).request({
                Messages: [
                    {
                        From: {
                            Email: this.fromEmail,
                            Name: this.fromName,
                        },
                        To: [
                            {
                                Email: email,
                            },
                        ],
                        Subject: subject,
                        HTMLPart:body
                    },
                ],
            })
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}