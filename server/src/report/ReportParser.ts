import * as stream from "stream";
import {HistoryItem} from "@common/HistoryItem";
import {Report} from "@common/Report";
import {History} from "@common/History";
import {ReportMeta} from "@common/ReportMeta";
import {ReportEnvironment} from "@common/ReportEnvironment";

type KeyVal = {[key: string]: string};

export class ReportParser {
  public readonly headerDelimiter: string = "#%";
  private readonly metaFields: Array<KeyVal> = [];
  private readonly variableFields: Array<KeyVal> = [];
  private readonly aliasFields: Array<KeyVal> = [];
  private readonly historyItems: Array<HistoryItem> = [];

  parse(buffer: Buffer): Report {
    const text = buffer.toString();
    const lines = text.split("\n");
    this.processLines(lines);

    const flatten = (list: Array<{[key: string]: string}>) =>
      list.reduce((obj, elem) => ({ ...obj, ...elem }), {});

    const metaFields = flatten(this.metaFields);
    const meta = new ReportMeta(metaFields.version, metaFields.shell, new Date(metaFields.date));
    const env = {
      aliases: flatten(this.aliasFields),
      variables: flatten(this.variableFields)
    };
    const environment = new ReportEnvironment(env);
    const history = new History();
    for (const item of this.historyItems) {
      history.addItem(item);
    }

    return new Report(meta, environment, history);
  }

  private parseKeyValue(keyval: string, lowercaseKey: boolean = false): KeyVal {
    const splitIndex = keyval.indexOf("=");
    const keyPart = keyval.substring(0, splitIndex);
    const valPart = keyval.substring(splitIndex+1);
    const key = lowercaseKey ? keyPart.toLowerCase() : keyPart;

    return { [key]: valPart };
  }

  private extractSectionName(line: string): string {
    if (!line.startsWith(this.headerDelimiter)) {
      return "";
    }

    return line.substring(this.headerDelimiter.length).trim().toLowerCase();
  }

  private processLines(lines: string[]) {
    let section: string = "";
    let foundEnd: boolean = false;

    for (const line of lines) {
      if (line.trim() === "") {
        continue;
      }

      const newSection = this.extractSectionName(line);
      if (newSection) {
        section = newSection;
        if (section === "eof") {
          foundEnd = true;
        }
        continue;
      }


      switch (section) {
        case "meta":
          this.metaFields.push(this.parseKeyValue(line, true));
          break;
        case "setup":
          // ignore these lines
          break;
        case "variables":
          this.variableFields.push(this.parseKeyValue(line));
          break;
        case "aliases":
          if (line) {
            this.aliasFields.push(this.parseKeyValue(line));
          }
          break;
        case "history":
          this.historyItems.push(HistoryItem.fromLine(line));
          break;
        case "eof":
          // Handle above in case there is no new line at end of file
          break;
        default:
          console.error(`This section wasn't recognized ${section}`)
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
