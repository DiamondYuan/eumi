import tsConfigPathToWebpackAlias from './tsconfigPathToWebpackAlias';
import { resolve } from 'path';

describe('test tsconfigPathToWebpackAlias', () => {
  const fixture = resolve(__dirname, '../../fixture/tsConfigPathToWebpackAlias');
  it('should get correct alias', async () => {
    const alias = await tsConfigPathToWebpackAlias(resolve(fixture, 'tsconfig.json'));
    Object.keys(alias).forEach((key) => {
      alias[key] = alias[key].replace(fixture, 'root');
    });
    expect(alias).toEqual({
      '@': 'root/src',
      common: 'root/src/common',
    });
  });

  it('should get empty object if tsconfig not Exist', async () => {
    const alias = await tsConfigPathToWebpackAlias(resolve(fixture, 'notExist.json'));
    expect(alias).toEqual({});
  });
});
