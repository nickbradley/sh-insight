import Util, {MailOptions} from "../Util";
import * as fs from "fs-extra";
import {ClientResponse} from "@sendgrid/client/src/response";

export class EmailService {
  private readonly emailAddress: string;
  private readonly contactable: boolean;

  constructor(emailAddress: string, contactable: boolean) {
    this.emailAddress = emailAddress;
    this.contactable = contactable;
  }

  async send(mailOptions: MailOptions): Promise<[ClientResponse, {}]> {
    return Util.sendEmail(mailOptions);
  }

  async sendWelcome(submissionId: string, linkOrigin: string): Promise<[ClientResponse, {}]> {
    const surveyLink = `https://ubc.ca1.qualtrics.com/jfe/form/SV_578RmtmqxrKrZoV?submission=${submissionId}`;
    const dashboardLink = `${linkOrigin}/dashboard/${submissionId}`;

    const subject = `sh>Insight Submission ${submissionId}`;
    const text =
`Thank you for submitting your shell usage report. It will help us to understand how developers use their shell and design tools to make working in the shell easier. We hope you found the dashboard informative. You can revisit it for the duration of the study by going to ${dashboardLink}.

If you have a few additional minutes, you could help us further by completing a short survey ${surveyLink}.

Regards,
Nick Bradley
Graduate Student
Department of Computer Science
The University of British Columbia`;
    const html = `
<html>
<head>
<title></title>
</head>
<body aria-readonly="false">
<pre>
Thank you for submitting your shell usage report. It will help us to understand how developers use their shell and design tools to make working in the shell easier.
We hope you found the dashboard informative. You can revisit it for the duration of the study by going to ${dashboardLink}.

If you have a few additional minutes, you could help us further by completing a short survey ${surveyLink}.

Regards,
Nick Bradley
Graduate Student
Department of Computer Science
The University of British Columbia</pre>
</body>
</html>`;

    return this.send({to: this.emailAddress, subject, text});
  }

  async store(storageDir: string) {
    await fs.appendFile(`${storageDir}/emails.txt`, this.emailAddress);
    if (this.contactable) {
      await fs.appendFile(`${storageDir}/contactable-emails.txt`, this.emailAddress);
    }
  }
}
