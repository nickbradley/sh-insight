import {Report} from "@common/Report";
import {ReportParser} from "./ReportParser";
import * as fs from "fs-extra";

export class ReportService {
  public readonly path: string;

  constructor(path: string) {
    this.path = path;
  }

  public async create(file: Express.Multer.File): Promise<[string, Report]> {
    const id = "XXX-YYY";
    const path = `${this.path}/${id}.txt`;
    const buffer = file.buffer;

    await fs.writeFile(path, buffer);
    const report = this.parse(buffer);
    return [id, report];
  }

  public parse(report: Buffer): Report {
    const reportParser = new ReportParser();
    return reportParser.parse(report);
  }
}
