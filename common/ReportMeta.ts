export class ReportMeta {
  public readonly version: string;
  public readonly shell: string;
  public readonly date: Date;

  constructor(version: string, shell: string, date: Date) {
    this.version = version;
    this.shell = shell;
    this.date = date;
  }
}
