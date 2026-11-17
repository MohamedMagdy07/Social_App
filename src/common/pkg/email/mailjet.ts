import Mailjet from 'node-mailjet';

interface IMailJetConfig{
    apiKey:string;
    apiSecret:string;
    fromEmail:string;
    fromName:string;
}

export class MailjetProvider {

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


    async sendEmail(email:string, subject:string, html:string) {
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
                        HTMLPart:html
                    },
                ],
            })
            return 0;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}