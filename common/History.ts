import * as ngrams from "simplengrams";
import {HistoryItem} from './HistoryItem';
import {CommandSequence} from "./Types";

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

    // [ {sequence: ["cd", "ls"], length: 2, instances: [3, 7, 9, 11, 18], occurrences: 5}, ... ]
    async getCommandSequences(maxLength = 8, startLength = 2): Promise<Array<CommandSequence>> {
      const commands = this.getCommands();
      let result: Array<CommandSequence> = [];
      for (let n = startLength; n <= maxLength; n++) {
        const sequences = await ngrams.from(commands, n, false, "");
        const x = sequences.reduce((previousValue: {[id: string]: CommandSequence}, currentValue, currentIndex) => {
          const sequenceId = currentValue.join(" ");
          if (previousValue[sequenceId]) {
            previousValue[sequenceId].instances.push(currentIndex);
            previousValue[sequenceId].occurrences += 1;
          } else {
            previousValue[sequenceId] = {
              sequence: currentValue,
              length: n,
              instances: [currentIndex],
              occurrences: 1
            };
          }
          return previousValue;
        }, {});
        result = result.concat(Object.values(x));
      }

      return result;
    }

    async getRankedCommandSequences(weights: {length: number; frequency: number; recency: number} = {length: 0.3, frequency: 0.3, recency: 0.4}) {
      const sequences = await this.getCommandSequences();

      const ranking: Array<{sequence: string[]; length: number; occurrences: number; weight: number; position: number; lastInstance: Array<HistoryItem>}> = []
      for (let position = 0; position < sequences.length; position++) {
        const seq = sequences[position];
        const lastInstancePos = seq.instances[seq.occurrences-1];
        const weight = weights.length * seq.length + weights.frequency * seq.occurrences + weights.recency * lastInstancePos;
        const lastInstance = [];
        for (let i = lastInstancePos; i < lastInstancePos + seq.length; i++) {
          lastInstance.push(this.items[i]);
        }

        ranking.push({
          sequence: seq.sequence,
          length: seq.length,
          occurrences: seq.occurrences,
          weight,
          position,
          lastInstance
        });
      }

      ranking.sort((a, b) => b.weight - a.weight);

      return ranking;
    }
}
