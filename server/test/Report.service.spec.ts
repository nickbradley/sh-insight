import * as fs from "fs-extra";
import {ReportService} from "../src/report/Report.service";
import {Report} from "@common/Report";

const testDataDir = "./test/data";
const tempDataDir = "/tmp/sh-insight/test/data";

describe("ReportService", () => {

  let service: ReportService;

  beforeAll(async () => {
    await fs.ensureDir(tempDataDir);
  });

  beforeEach(async () => {
    await fs.emptyDir(tempDataDir);
    service = new ReportService(tempDataDir);
  });

  describe("read(..)", () => {

    it("should return the demo report.", async () => {
      const report = Report.fromJson(await fs.readJson("./report-demo.json"));
      await expect(service.read("demo")).resolves.toStrictEqual(report);
    });

    it("should return an existing report.", async () => {
      const id = "abc123";
      await fs.copyFile(`${testDataDir}/report-short.json`, `${tempDataDir}/report-${id}.json`);
      const report = Report.fromJson(await fs.readJson(`${testDataDir}/report-short.json`));
      await expect(service.read(id)).resolves.toStrictEqual(report);
    });

    it("should throw an error if the report doesn't exist.", async () => {
      await expect(service.read("fake12")).rejects.toThrow("ENOENT: no such file or directory, open './test/data/report-fake12.json'");
    });

    it("should throw an error if the report serialization is invalid.", async () => {
      const id = "abc123";
      const invalidReport = {not: "valid"};
      await fs.writeJson(`${tempDataDir}/report-${id}.json`, invalidReport);
      await expect(service.read(id)).rejects.toThrow("");
    });
  });
});

