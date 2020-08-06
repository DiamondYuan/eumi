import { IApi } from '@umijs/types';
import { chainWebpackAlias } from '../../../utils/configAlias';
import tsconfigPathToWebpackAlias from '../../../utils/tsconfigPathToWebpackAlias';
import { join } from 'path';

export default (api: IApi) => {
  api.chainWebpack(async (memo) => {
    const tsConfig = join(process.cwd(), 'tsconfig.json');
    const alias = await tsconfigPathToWebpackAlias(tsConfig);
    chainWebpackAlias(memo, alias);
    return memo;
  });
};
