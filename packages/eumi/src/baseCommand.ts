import Command from 'common-bin';
import address from 'address';
import { exists } from 'mz/fs';
import { IConfig } from './type';

const utils = {
  address,
};

const CONFIG_FILES = ['.eumirc.js'];

export interface EumiContext extends Command.Context {
  utils: typeof utils;
  config: IConfig;
}

abstract class BaseCommand extends Command {
  async run(context: Command.Context) {
    const configFile = await this.getConfigFilePath();
    // TODO support ts
    const config = configFile ? require(configFile) : {};
    await this._run({
      ...context,
      utils,
      config,
    });
  }

  private async getConfigFilePath(): Promise<string | null> {
    for (const config of CONFIG_FILES) {
      if (await exists(config)) {
        return config;
      }
    }
    return null;
  }

  abstract _run(context: EumiContext): Promise<void>;
}

export default BaseCommand;
