import {MailService} from "@sendgrid/mail";
import Log from "../Log";

export class Email {
  public readonly id: string;
  public readonly address: string;
  public readonly canContact: boolean;
  private readonly mailer: MailService;

  constructor(id: string, address: string, canContact: boolean) {
    this.id = id;
    this.address = address;
    this.canContact = canContact;
    this.mailer = new MailService();
    this.mailer.setApiKey(process.env.SENDGRID_API_KEY || "");
  }

  send(opts: { subject: string; text: string }) {
    Log.info(`Email::send(..) - Start.`);
    const data = {
      to: this.address,
      from: process.env.FROM_EMAIL || "",
      subject: opts.subject,
      text: opts.text
    }

    return this.mailer.send(data);
  }

  toString() {
    return `${this.address}\t${this.canContact ? 1 : 0}\t${this.id}\n`;
  }
}
