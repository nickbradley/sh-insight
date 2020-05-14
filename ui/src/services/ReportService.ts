import axios from 'axios'
import { Report } from '../../../common/Report'

export class ReportService {
  public origin: string
  private _reportId?: string;
  private _report?: Report;

  constructor (origin: string) {
    this.origin = origin
  }

  get reportId () {
    return this._reportId
  }

  get report () {
    return this._report
  }

  async post (reportFile: File) {
    const formData = new FormData()
    formData.append('report', reportFile)

    const config = {
      headers: {
        'Content-Type': 'text/plain'
      }
    }
    const res = await axios.post(`${this.origin}/report`, formData, config)
    console.log(res.data)
    const reportData = res.data.report
    this._reportId = res.data.id
    this._report = Report.fromJson(reportData)
  }
}
