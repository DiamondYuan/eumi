import yargs from 'yargs';

interface IProgramOption {
  cwd: string;
  argv: string[];
}

abstract class BaseCommand {
  abstract get command(): { name: string; description: string };
}

class Program {
  private commands: BaseCommand[];
  constructor(private option: IProgramOption) {
    this.commands = [];
  }

  public addCommand(command: BaseCommand) {
    this.commands.push(command);
  }

  public async start() {
    let yargsInstance = yargs(this.option.argv).scriptName('eumi');
    for (const command of this.commands) {
      yargsInstance = yargsInstance.command(command.command.name, command.command.description);
    }
  }
}

export { Program, BaseCommand };
