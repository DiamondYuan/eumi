import webpack from 'webpack';
import Config from 'webpack-chain';

const modifyWebpackAlias = (
  webpackConfig: webpack.Configuration,
  targetAlias: Object
): webpack.Configuration => {
  const resolve: webpack.Configuration['resolve'] = webpackConfig.resolve ?? {};
  const alias = resolve.alias ?? {};
  Object.keys(targetAlias).forEach((key) => {
    if (typeof alias[key] !== 'string') {
      alias[key] = targetAlias[key];
    }
  });
  resolve.alias = alias;
  webpackConfig.resolve = resolve;
  return webpackConfig;
};

const chainWebpackAlias = (chain: Config, targetAlias: Object) => {
  Object.keys(targetAlias).forEach((key) => {
    if (!chain.resolve.alias.has[key]) {
      chain.resolve.alias.set(key, targetAlias[key]);
    }
  });
  return chain;
};

export { modifyWebpackAlias, chainWebpackAlias };
