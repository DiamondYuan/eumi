import tsConfigPathToWebpackAlias from './tsconfigPathToWebpackAlias';
import { resolve } from 'path';

describe('test tsconfigPathToWebpackAlias', () => {
  it('should get correct alias', async () => {
    const fixture = resolve(__dirname, '../../fixture/tsConfigPathToWebpackAlias');
    const alias = await tsConfigPathToWebpackAlias(resolve(fixture, 'tsconfig.json'));
    Object.keys(alias).forEach((key) => {
      alias[key] = alias[key].replace(fixture, 'root');
    });
    expect(alias).toEqual({
      '@': 'root/src',
      common: 'root/src/common',
    });
  });
});
