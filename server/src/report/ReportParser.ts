import * as stream from "stream";
import {HistoryItem} from "@common/HistoryItem";
import {Report} from "@common/Report";
import {History} from "@common/History";

export class ReportParser {
  public readonly history: History;

  public readonly headerDelimiter: string = "#%";

  constructor() {
    this.history = new History();

  }

  parse(buffer: Buffer): Report {
    const text = buffer.toString();
    const lines = text.split("\n");
    this.processLines(lines);

    return new Report(this.history);
  }

  extractSectionName(line: string): string {
    if (!line.startsWith(this.headerDelimiter)) {
      return "";
    }

    return line.substring(this.headerDelimiter.length).trim().toLowerCase();
  }

  private processLines(lines: string[]) {
    let section: string = "";
    let foundEnd: boolean = false;

    for (const line of lines) {
      const newSection = this.extractSectionName(line);
      if (newSection) {
        section = newSection;
        continue;
      }

      switch (section) {
        case "variables":
          break;
        case "aliases":
          break;
        case "history":
          const historyItem = HistoryItem.fromLine(line);
          this.history.addItem(historyItem);
          break;
        case "eof":
          foundEnd = true;
          break;
        default:
          throw new Error("Section not recognized");
      }
    }

    if (!foundEnd) {
      throw new Error("Report is malformed: 'end' section is missing.");
    }
  }
}


/*
export class ReportParser extends stream.Writable {
  public readonly history: History;

  private complete: boolean;
  private buffer?: Buffer | Uint8Array;

  private section?: string;

  private readonly headerDelimiter: string = "#%";
  constructor() {
    super();
    this.history = new History();
    this.complete = false;

  }

  _write(chunk: Buffer, enc: string, next: any) {
    if (this.buffer) {
      chunk = Buffer.concat([this.buffer, chunk]);
    }

    const lastLinePos = chunk.lastIndexOf("\n") + 1;
    if (!lastLinePos) {
      this.buffer = chunk;
      return next();
    }

    this.buffer = Buffer.from(chunk.slice(lastLinePos));

    const lines = chunk.toString("utf8", 0, lastLinePos).split("\n");
    this.processLines(lines);

    next();
  }

  createReport(text?: string): Report {
    if (text) {
      const lines = text.split("\n");
      this.processLines(lines);
    }

    if (!this.complete) {
      throw new Error("The full report has not been parsed.");
    }

    return new Report(this.history);
  }

  private extractSectionName(line: string): string {
    if (!line.startsWith(this.headerDelimiter)) {
      return "";
    }

    return line.substring(this.headerDelimiter.length).trim().toLowerCase();
  }

  private processLines(lines: string[]) {
    for (const line of lines) {
      const newSection = this.extractSectionName(line);
      if (newSection) {
        this.section = newSection;
        continue;
      }

      switch (this.section) {
        case "alias":
          // const aliasItem = this.parseAliasLine(line);
          // TODO
          break;
        case "history":
          const historyItem = HistoryItem.fromLine(line);
          this.history.addItem(historyItem);
          break;
        case "end":
          this.complete = true;
          break;
        default:
          throw new Error("Section not recognized");
      }

    }
  }


}
*/
