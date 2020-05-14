import express, {Request, Response, Router} from "express";
import multer from "multer";
import {ReportService} from "./Report.service";
import * as fs from "fs-extra";

export class ReportRouter {
  public readonly path: string;
  private readonly router: Router;

  private constructor(path: string) {
    this.path = path;
    this.router = express.Router();
    const upload = multer({ storage: multer.memoryStorage() });
    const reportService = new ReportService(path);

    this.router.post("/", upload.single("report"), async (req: Request, res: Response) => {
      try {
        const [id, report] = await reportService.create(req.file);
        res.status(201).send({ id, report });
      } catch (err) {
        console.error(err);
        res.status(500).send(err);
      }
    });
  }

  static create(reportPath: string) {
    return new ReportRouter(reportPath).router;
  }
}
