import express, {Request, Response, Router} from "express";
import multer from "multer";
import {ReportService} from "./Report.service";
import Log from "../Log";

export class ReportRouter {
  public readonly path: string;
  private readonly router: Router;
  private readonly reportService: ReportService;

  private constructor(path: string) {
    this.path = path;
    this.router = express.Router();
    const upload = multer({ storage: multer.memoryStorage() });
    this.reportService = new ReportService(path);

    this.router.get("/command-sequence", this.getCommandSequence.bind(this));
    this.router.get("/:id", this.get.bind(this));
    this.router.get("/:id/dashboard", this.getDashboard.bind(this));
    this.router.post("/", upload.single("report"), this.post.bind(this));
  }

  async get(req: Request, res: Response) {
    Log.info(`ReportRouter::get(..) - Request received.`);
    Log.trace(req);

    try {
      const id = req.params.id;
      const report = await this.reportService.read(id);
      const body = { report };
      res.json(body);
      Log.info(`Success.`);
      Log.trace(`Responding with status 200 and body: ${body}`);
    } catch (err) {
      Log.error(err);
      if (err.message.startsWith("ENOENT")) {
        res.status(404).send("The supplied id does not exist.");
      } else {
        res.status(500).send(err.toString());
      }
    }
  }

  async post(req: Request, res: Response) {
    Log.info(`ReportRouter::post(..) - Request received.`);
    Log.trace(req);

    try {
      const [id, report] = await this.reportService.create(req.file);
      const body = { id, report };
      res.status(201).send(body);
      Log.info(`Success.`);
      Log.trace(`Responded with status 201 and body: ${body}`);
    } catch (err) {
      Log.error(err);
      res.status(500).send(err);
    }
  }

  async getCommandSequence(req: Request, res: Response) {
    Log.info(`ReportRouter::getCommandSequence(..) - Request received.`);
    Log.trace(req);

    let code = 500;
    let body;

    try {
      const id = req.query.id as string;
      if (!id) throw new Error("The query parameter 'id' is required.");
      const report = await this.reportService.read(id);
      const sequences = await report.history.getRankedCommandSequences();
      const historySegment = sequences[0].lastInstance.map((item) => `${item.id} ${item.command} ${item.args}`).join("<br>");
      code = 200;
      body = JSON.stringify({segment: historySegment});
    } catch (err) {
      code = 500;
      body = err;
    } finally {
      Log.info(`Responding with status ${code} and body: ${body}`)
      res.status(code).send(body);
    }
  }

  async getDashboard(req: Request, res: Response) {
    Log.info(`ReportRouter::getDashboard(..) - Request received.`);

    let code = 500;
    let body;

    try {
      const id = req.params.id;
      const report = await this.reportService.read(id);
      //const dashboard = new DashboardData(report);
      const dashboard = {
        aliasUsage: report.computeAliasUsage(),
        commandUsage: report.computeCommandUsage(),
        commandPairs: await report.computeCommandPairs(),
        commandTriplets: await report.computeCommandTriplets()
      }
      code = 200;
      body = JSON.stringify(dashboard);
    } catch (err) {
      code = 500;
      body = err;
    } finally {
      Log.info(`Responding with status ${code} and body: ${body.substr(0, 30)}`);
      res.status(code).send(body);
    }
  }


  static create(reportPath: string) {
    return new ReportRouter(reportPath).router;
  }
}
