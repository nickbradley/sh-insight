import { History } from '@common/History'
import {ReportMeta} from "./ReportMeta";
import {ReportEnvironment} from "./ReportEnvironment";

export class Report {
  public readonly meta: ReportMeta;
  public readonly environment: ReportEnvironment;
  public readonly history: History

  constructor (meta: ReportMeta, environment: ReportEnvironment, history: History) {
    this.meta = meta;
    this.environment = environment;
    this.history = history;
  }

  static fromJson (report: any): Report {
    const meta = report.meta;
    const environment = report.environment;
    const historyItems = report.history.items;
    const history = new History(historyItems);

    return new Report(meta, environment, history);
  }
}
