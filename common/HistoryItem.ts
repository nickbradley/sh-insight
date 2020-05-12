export class HistoryItem {
    id: number;
    timestamp: number | undefined;
    command: string;
    args: string;

    constructor(id: number, command: string, args: string, timestamp?: number) {
        this.id = id;
        this.command = command;
        this.args = args;
        this.timestamp = timestamp;
    }

    static fromLine(line: string): HistoryItem {
      const event = line.substring(0, 5);
      const timestamp = line.substring(7, 23)
      const commandLine = line.substring(25)

      let commandBreak = commandLine.indexOf(" ");
      commandBreak = commandBreak >= 0 ? commandBreak : commandLine.length;
      const command = commandLine.substring(0, commandBreak);
      const args = commandLine.substring(commandBreak + 1);

      return new HistoryItem(Number(event), command, args, Date.parse(timestamp));
    }
}
