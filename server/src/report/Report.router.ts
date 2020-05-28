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

    this.router.get("/:id", this.get.bind(this));
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

  static create(reportPath: string) {
    return new ReportRouter(reportPath).router;
  }
}
