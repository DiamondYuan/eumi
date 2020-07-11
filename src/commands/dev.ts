import BaseCommand from '../baseCommand';
import Command from 'common-bin';
import start from '../legacy/start';
import { join } from 'path';

class DevCommand extends BaseCommand {
  async _run({ cwd }: Command.Context) {
    const webpackConfig = join(cwd, 'build/webpack.main.config.js');
    start(webpackConfig, cwd);
  }
}

export default DevCommand;
