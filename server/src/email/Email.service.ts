import Util, {MailOptions} from "../Util";
import * as fs from "fs-extra";
import {ClientResponse} from "@sendgrid/client/src/response";
import {Email} from "./Email";
import Log from "../Log";


export class EmailService {
  private readonly file: string;

  constructor(file: string) {
    this.file = file;
  }

//   async sendEmail(mailOptions: MailOptions): Promise<[ClientResponse, {}]> {
//     return Util.sendEmail(mailOptions);
//   }
//
//   async sendWelcome(to: Email, linkOrigin: string): Promise<[ClientResponse, {}]> {
//     const surveyLink = `https://ubc.ca1.qualtrics.com/jfe/form/SV_578RmtmqxrKrZoV?submission=${submissionId}`;
//     const dashboardLink = `${linkOrigin}/dashboard/${this.submissionId}`;
//
//     const subject = `sh>Insight Submission ${this.submissionId}`;
//     const text =
// `Thank you for submitting your shell usage report. It will help us to understand how developers use their shell and design tools to make working in the shell easier. We hope you found the dashboard informative. You can revisit it for the duration of the study by going to ${dashboardLink}.
//
// If you have a few additional minutes, you could help us further by completing a short survey ${surveyLink}.
//
// Regards,
// Nick Bradley
// Graduate Student
// Department of Computer Science
// The University of British Columbia`;
//     return this.sendEmail({to: this.address, subject, text});
//   }

  // toString() {
  //   return `${this.address}\t${this.canContact ? 1 : 0}\t${this.submissionId}\n`;
  // }
  // async store(storageDir: string) {
  //   const line = `${this.emailAddress}\t${this.contactable ? 1 : 0}\n`;
  //   await fs.appendFile(`${storageDir}/emails.txt`, line);
  // }

  async create(id: string, address: string, canContact: boolean): Promise<Email> {
    Log.info(`EmailService::create(..) - Start.`);
    const email = new Email(id, address, canContact);
    await fs.appendFile(this.file, email.toString());
    return email;
  }
}
