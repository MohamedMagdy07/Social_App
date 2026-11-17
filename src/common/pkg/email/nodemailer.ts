import {Transporter ,createTransport} from 'nodemailer';
import {env} from "../../lib/config/env";


interface INodeMailerConfig{
    host:string;
    port:number;
    user:string;
    password:string;
    fromEmail:string ;
    fromName:string;
}

export class NodeMailerProvider {

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
                pass: config.password,
            },
        });
        this.fromEmail = config.fromEmail;
        this.fromName = config.fromName;
    }

    async sendEmail(email:string, subject:string, html:string) {
        try {
            await this.client.sendMail({
                from: `${this.fromName} : ${this.fromEmail}`,
                to:email,
                subject:subject,
                html: html, // HTML body
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}