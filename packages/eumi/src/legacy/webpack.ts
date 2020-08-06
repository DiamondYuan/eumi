import { join } from 'path';
import webpack from 'webpack';
import tsconfigPathToWebpackAlias from '../utils/tsconfigPathToWebpackAlias';
import { modifyWebpackAlias } from '../utils/configAlias';

interface BuildConfig {
  dev?: boolean;
  callback: webpack.Compiler.Handler;
  webpackConfig: webpack.Configuration;
}

export const build = async (config: BuildConfig) => {
  const tsConfig = join(process.cwd(), 'tsconfig.json');
  const alias = await tsconfigPathToWebpackAlias(tsConfig);
  modifyWebpackAlias(config.webpackConfig, alias);
  const compiler = webpack(config.webpackConfig);
  if (config.dev) {
    compiler.watch({}, config.callback);
  } else {
    compiler.run(config.callback);
  }
};
