import tsConfigPathToWebpackAlias from '../../../src/utils/tsconfigPathToWebpackAlias';
import { resolve, join } from 'path';
import { getFixturePath } from '../../fixture';

describe('test tsconfigPathToWebpackAlias', () => {
  const fixture = getFixturePath('tsConfigPathToWebpackAlias');
  it('should get correct alias', async () => {
    const alias = await tsConfigPathToWebpackAlias(resolve(fixture, 'tsconfig.json'));
    Object.keys(alias).forEach((key) => {
      alias[key] = alias[key].replace(fixture, 'root');
    });
    expect(alias).toEqual({
      '@': join('root', 'src'),
      common: join('root', 'src', 'common'),
    });
  });

  it('should get empty object if tsconfig not Exist', async () => {
    const alias = await tsConfigPathToWebpackAlias(resolve(fixture, 'notExist.json'));
    expect(alias).toEqual({});
  });
});
