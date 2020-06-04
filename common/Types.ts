export interface DashboardData {
  aliasUsage: Array<{name: string; count: number; instances: number[]; definition: string}>;
  commandUsage: Array<{command: string; count: number; instances: number[]}>;
  commandPairs: Array<CommandSequence>;
  commandTriplets: Array<CommandSequence>;
}

export interface CommandSequence {
  sequence: string[];
  length: number;
  instances: number[];
  occurrences: number;
}
