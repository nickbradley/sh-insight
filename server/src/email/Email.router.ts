import express, {Request, Response, Router} from "express";
import {EmailService} from "./Email.service";
import Util from "../Util";

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

      if (!Util.isString(emailAddress)) throw new TypeError("Field 'email' is not a string.");
      if (!Util.isBoolean(contactable)) throw new TypeError("Field 'contact' is not a boolean.");
      if (!Util.isString(submissionId)) throw new TypeError("Field 'submissionId' is not a string.");
      if (emailAddress.length === 0) throw new RangeError("Field 'email' has length 0.");
      if (submissionId.length !== 6) throw new RangeError("Field 'submissionId' does not have expected length of 6.");

      const email = new EmailService(emailAddress, contactable);

      try {
        await email.store(this.dataDir);
        const origin = req.get("origin");
        if (!origin) throw new Error("Origin header is not set but is required to send emails.");
        const result = await email.sendWelcome(submissionId, origin);
        console.log("Email sent", result);
        res.status(201).send();
      } catch (err) {
        console.error(err);
        console.log("Errors", err.response.body.errors);
        res.status(500).send(err.toString());
      }
    } catch (err) {
      console.error(err);
      res.status(400).send(err.toString());
    }
  }
}
