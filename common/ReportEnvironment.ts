export class ReportEnvironment {
  private readonly aliases: {[key: string]: string};
  private readonly variables: {[key: string]: string};

  constructor(environment: {aliases?: {[key: string]: string}, variables?: {[key: string]: string}} = {}) {
    this.aliases = environment.aliases || {};
    this.variables = environment.variables || {};
  }

  addAlias(name: string, definition: string) {
    this.aliases[name] = definition;
  }

  removeAlias(name: string) {
    delete this.aliases[name];
  }

  getAlias(name: string) {
    return this.aliases[name];
  }

  addVariable(name: string, value: string) {
    this.variables[name] = value;
  }

  removeVariable(name: string) {
    delete this.variables[name];
  }

  getVariable(name: string) {
    return this.variables[name];
  }
}
