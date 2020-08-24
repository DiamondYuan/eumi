import BaseCommand, { EumiContext } from '../baseCommand';
import start from '../legacy/start';
import { join } from 'path';

class DevCommand extends BaseCommand {
  async _run({ cwd, config }: EumiContext) {
    const mainConfigPath = config?.main?.configPath || 'build/webpack.main.config.js';
    const webpackConfig = join(cwd, mainConfigPath);
    start(webpackConfig, cwd);
  }
}

export default DevCommand;
