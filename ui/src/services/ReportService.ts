import { Report } from '../../../common/Report'
import {Api} from "@/Api";

export class ReportService {
  public api: Api
  private _reportId?: string;
  private _report?: Report;

  constructor (api: Api) {
    this.api = api
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

    const request = {
      data: formData,
      headers: {
        'Content-Type': 'text/plain'
      }
    }
    const res = await this.api.execute('post', '/report', request)
    const reportData = res.data.report
    this._reportId = res.data.id
    this._report = Report.fromJson(reportData)
  }
}
