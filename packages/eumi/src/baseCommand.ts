import Command from 'common-bin';
import address from 'address';

const utils = {
  address,
};

interface EumiContext extends Command.Context {
  utils: typeof utils;
}

abstract class BaseCommand extends Command {
  async run(context: Command.Context) {
    this._run({
      ...context,
      utils,
    });
  }
  abstract _run(context: EumiContext): Promise<void>;
}

export default BaseCommand;
