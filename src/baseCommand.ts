import Command from 'common-bin';

abstract class BaseCommand extends Command {
  async run(context: Command.Context) {
    this._run(context);
  }
  abstract _run(context: Command.Context): Promise<void>;
}

export default BaseCommand;
