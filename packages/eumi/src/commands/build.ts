import BaseCommand, { EumiContext } from '../baseCommand';
import build from '../legacy/build';
import { join } from 'path';

class DevCommand extends BaseCommand {
  async _run({ cwd, config }: EumiContext) {
    const mainConfigPath = config?.main?.configPath || 'build/webpack.main.config.js';
    const webpackConfig = join(cwd, mainConfigPath);
    await build({ cwd, webpackConfig });
  }
}

export default DevCommand;
