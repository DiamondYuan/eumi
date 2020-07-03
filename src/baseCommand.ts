import Command from "common-bin";

abstract class BaseCommand extends Command {
  constructor(rawArgv: string[]) {
    super(rawArgv);
  }

  abstract _run(context: Command.Context): Promise<void>;

  async run(context: Command.Context) {
    this._run(context);
  }
}

export default BaseCommand;
