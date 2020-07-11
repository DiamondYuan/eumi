import BaseCommand from '../baseCommand';
import Command from 'common-bin';
import build from '../legacy/build';
import { join } from 'path';

class DevCommand extends BaseCommand {
  async _run({ cwd }: Command.Context) {
    const webpackConfig = join(cwd, 'build/webpack.main.config.js');
    await build({ cwd, webpackConfig });
  }
}

export default DevCommand;
