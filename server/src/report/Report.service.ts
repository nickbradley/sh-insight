import {Report} from "@common/Report";
import {ReportParser} from "./ReportParser";
import * as fs from "fs-extra";
import Util from "../Util";

export class ReportService {
  public readonly path: string;

  constructor(path: string) {
    this.path = path;
  }

  public async create(file: Express.Multer.File): Promise<[string, Report]> {
    const id = Util.generateShortId();
    const path = `${this.path}/uploads/report-${id}.txt`;
    const buffer = file.buffer;

    await fs.writeFile(path, buffer);
    const report = this.parse(buffer);
    await fs.writeJson(`${this.path}/uploads/report-${id}.json`, report);
    return [id, report];
  }

  public async read(id: string): Promise<Report> {
    let dir = `${this.path}/uploads`;
    if (id === "demo") {
      dir = ".";
    }

    const file = `${dir}/report-${id}.json`;
    const report = await fs.readJson(file);

    return Report.fromJson(report);
  }

  public parse(report: Buffer): Report {
    const reportParser = new ReportParser();
    return reportParser.parse(report);
  }
}
