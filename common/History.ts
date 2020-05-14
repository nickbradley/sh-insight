import { HistoryItem } from './HistoryItem';

export class History {
    public readonly items: Array<HistoryItem>;

    constructor(items: Array<HistoryItem> = []) {
        this.items = items;
    }

    addItem(item: HistoryItem) {
        this.items.push(item);
    }

    getCommands() {
        const commands = [];
        for (const item of this.items) {
            commands.push(item.command);
        }
        return commands;
    }

    getCommandCount(): {[command: string]: number} {
        const commands = this.getCommands();

        return commands.reduce((rv: {[command: string]: number}, val: string) => {
            if (rv[val]) {
                rv[val] += 1;
            } else {
                rv[val] = 1;
            }
            return rv;
        }, {});
    }
}
