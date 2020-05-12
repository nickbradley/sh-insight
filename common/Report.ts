import { History } from '@common/History'

export class Report {
  public readonly history: History

  constructor (history: History) {
    this.history = history
  }

  static fromJson (report: any): Report {
    const historyItems = report.history.items
    const history = new History(historyItems)
    return new Report(history)
  }

  callme () {
    console.log('Report method was called.')
  }
}
