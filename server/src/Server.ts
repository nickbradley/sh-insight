import express, { Application } from "express";
import cors from "cors";
import * as http from "http";
import {ReportRouter} from "./report/Report.router";
import * as fs from "fs-extra";
import {EmailService} from "./email/Email.service";
import {EmailRouter} from "./email/Email.router";

export class Server {
  public readonly app: Application;
  public readonly staticDir: string;
  public readonly dataDir: string;
  private server?: http.Server;

  constructor(staticDir: string, dataDir: string, allowCORS: boolean = false) {
    this.app = express();
    this.staticDir = staticDir;
    this.dataDir = dataDir;

    if (allowCORS) {
      this.app.use(cors());
    }

    this.app.use("/", express.static(this.staticDir));
    this.app.use("/report", ReportRouter.create(this.dataDir));
    this.app.use("/email", new EmailRouter(this.dataDir).router);

// Return aggregate statistics from submitted reports.
    this.app.route("/stats")
      .get((req, res) => {
        res.status(200).send({});
      });

  }

  public async start(port: number): Promise<void> {
    await fs.ensureDir(this.dataDir);

    return new Promise<void>((resolve, reject) => {
      this.server = http.createServer(this.app);
      this.server.on("error", reject);
      this.server.on("listening", resolve);
      this.server.listen(port);
    });
  }

  public async stop(): Promise<void> {
    if (!this.server) {
      throw new Error("Server has not been started.");
    }
    return new Promise<void>((resolve, reject) => {
      this.server!.on("error", reject);
      this.server!.on("close", resolve);
      this.server!.close();
    });
  }
}
