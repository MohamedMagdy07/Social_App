import {Transporter ,createTransport} from 'nodemailer';
import {env} from "../../lib/config/env";
import {IMailProvider} from "./interface";


interface INodeMailerConfig{
    host:string;
    port:number;
    user:string;
    secure?:boolean,
    pass:string;
    fromEmail:string ;
    fromName:string;
}

export class NodeMailerProvider implements IMailProvider{

    private client:Transporter ;
    private readonly fromEmail:string ;
    private readonly fromName:string;

    constructor(config:INodeMailerConfig) {
        this.client = createTransport({
            host: config.host,
            port: config.port,
            secure: false,
            auth: {
                user: config.user,
                pass: config.pass,
            },
        });
        this.fromEmail = config.fromEmail;
        this.fromName = config.fromName;
    }

    async send(email:string, subject:string, body:string) {
        try {
            await this.client.sendMail({
                from: `${this.fromName} : ${this.fromEmail}`,
                to:email,
                subject:subject,
                html: body, // HTML body
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}