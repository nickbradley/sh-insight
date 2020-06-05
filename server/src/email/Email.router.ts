import express, {Request, Response, Router} from "express";
import {EmailService} from "./Email.service";
import Util from "../Util";
import Log from "../Log";

export class EmailRouter {
  public readonly router: Router;
  private readonly dataDir: string;

  constructor(dataDir: string) {
    this.dataDir = dataDir;
    this.router = express.Router();

    this.router.post("/", express.json(), this.post.bind(this));
  }

  async post(req: Request, res: Response) {
    console.log("EmailRouter::post(..) - Start.");
    try {
      const emailAddress = req.body.email;
      const contactable = req.body.contact;
      const submissionId = req.body.submissionId;
      const origin = req.get("origin");

      if (!Util.isString(emailAddress)) throw new TypeError("Field 'email' is not a string.");
      if (!Util.isBoolean(contactable)) throw new TypeError("Field 'contact' is not a boolean.");
      if (!Util.isString(submissionId)) throw new TypeError("Field 'submissionId' is not a string.");
      if (emailAddress.length === 0) throw new RangeError("Field 'email' has length 0.");
      if (submissionId.length !== 6) throw new RangeError("Field 'submissionId' does not have expected length of 6.");
      if (!origin) throw new Error("Origin header is not set but is required to send emails.");

      try {
        const service = new EmailService(`${this.dataDir}/emails.txt`);
        Log.info(`EmailRouter::post(..) - Creating email record.`);
        const email = await service.create(submissionId, emailAddress, contactable);
        Log.info(`EmailRouter::post(..) - Sending welcome email.`);
        const result = await email.send({
          subject: `sh>Insight Submission ${email.id}`,
          text:
            `Thank you for submitting your shell usage report. It will help us to understand how developers use their shell and design tools to make working in the shell easier. We hope you found the dashboard informative. You can revisit it for the duration of the study by going to ${origin}/dashboard/${email.id}.

If you have a few additional minutes, you could help us further by completing a short survey https://ubc.ca1.qualtrics.com/jfe/form/SV_578RmtmqxrKrZoV?submission=${email.id}.

Regards,
Nick Bradley
Graduate Student
Department of Computer Science
The University of British Columbia`
        });
        Log.info(`EmailRouter::post(..) - Sending email resulted in status ${result[0].statusCode} ${result[0].body}`);
        res.status(201).send();
      } catch (err) {
        Log.error(err);
        res.status(500).send(err.toString());
      }
    } catch (err) {
      Log.error(err);
      res.status(400).send(err.toString());
    }
  }
}
