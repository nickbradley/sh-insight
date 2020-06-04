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

  computeAliasUsage(): Array<{name: string; count: number; instances: number[]; definition: string}> {
    const aliasDefs = this.environment.aliases;
    const aliasUsage: {[name: string]: {count: number; instances: number[]; definition: string}} = {};
    for (const [name, def] of Object.entries(aliasDefs)) {
      aliasUsage[name] = {
        count: 0,
        instances: [],
        definition: def
      }
    }
    this.history.items.forEach((val, idx) => {
      for (const name of Object.keys(aliasUsage)) {
        if (val.command === name) {
          aliasUsage[name].count++;
          aliasUsage[name].instances.push(idx);
          break;
        }
      }
    });
    const result: Array<{name: string; count: number; instances: number[]; definition: string}> = [];
    Object.entries(aliasUsage).forEach(([key, val]) => result.push(Object.assign({name: key}, val)));
    return result;
  }

  computeCommandUsage(): Array<{command: string; count: number; instances: number[]}> {
    const commands = this.history.getCommands();
    const commandUsage = commands.reduce((rv, val, idx) => {
      if (rv[val]) {
        rv[val].count++;
        rv[val].instances.push(idx);
      } else {
        rv[val] = {count: 1, instances: [idx]};
      }
      return rv;
    }, {} as {[command: string]: {count: number; instances: number[]}});
    const result: Array<{command: string; count: number; instances: number[]}> = [];
    Object.entries(commandUsage).forEach(([key, val]) => result.push(Object.assign({command: key}, val)));
    return result;
  }

  async computeCommandPairs() {
    return await this.history.getCommandSequences(2,2);
  }

  async computeCommandTriplets() {
    return await this.history.getCommandSequences(3,3);
  }
}
