import * as fs from "fs-extra";
import {ReportParser} from "../src/report/ReportParser";

const dataDir = "./test/data";

describe("ReportParser", () => {

  let parser: ReportParser;
  beforeEach(() => {
    parser = new ReportParser();
  });

  describe("parse(..)", () => {
    it("should parse a valid report.", async () => {
      const buffer = await fs.readFile(`${dataDir}/report-short.dat`);
      const report = JSON.parse(JSON.stringify(parser.parse(buffer)));
      const jsonReport = await fs.readJson(`${dataDir}/report-short.json`);
      expect(report).toStrictEqual(jsonReport);
    });
  });
});
