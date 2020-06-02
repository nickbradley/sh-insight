import {History} from "@common/History";
import {ReportParser} from "../src/report/ReportParser";
import * as fs from "fs-extra";

describe("History", () => {
  describe("getCommandSequences(..)",() => {
    it("should work", async () => {
      const buffer = await fs.readFile("./test/data/report.dat");
      const report = new ReportParser().parse(buffer);
      const history = report.history;
      const sequences = await history.getCommandSequences(2);
      expect(sequences).toBe([]);
    });
  });

  describe("getRankedCommandSequences", () => {
    it("should do something", async () => {
      const buffer = await fs.readFile("./test/data/report.dat");
      const report = new ReportParser().parse(buffer);
      const history = report.history;
      const ranking = await history.getRankedCommandSequences();
      expect(ranking).toBe([]);
    });
  });
});
