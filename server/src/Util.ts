import crypto from "crypto";
import { MailService } from "@sendgrid/mail";
import {ClientResponse} from "@sendgrid/client/src/response";

export interface MailOptions {
  to: string;
  from?: string;
  subject: string;
  text: string;
  html?: string;
}

export default class Util {
  static generateShortId() {
    return crypto.randomBytes(3).toString("hex");
  }

  static async sendEmail(mail: MailOptions): Promise<[ClientResponse, {}]> {
    const mailer = new MailService();
    mailer.setApiKey(process.env.SENDGRID_API_KEY || "");

    const data = {
      to: mail.to,
      from: mail.from ? mail.from : (process.env.FROM_EMAIL || ""),
      subject: mail.subject,
      text: mail.text,
      html: mail.html
    }

    console.log("sending email", data);

    return mailer.send(data);
  }

  static isBoolean(val: any): boolean {
    return typeof val === "boolean";
  }

  static isString(val: any): boolean {
    return Object.prototype.toString.call(val) === "[object String]";
  }
}
