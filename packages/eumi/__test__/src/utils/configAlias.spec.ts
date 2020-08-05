import { modifyWebpackAlias, chainWebpackAlias } from '../../../src/utils/configAlias';
import Config from 'webpack-chain';

describe('test configAlias', () => {
  it('should get correct alias', async () => {
    expect(
      await modifyWebpackAlias(
        {},
        {
          umi: '/root/umi',
          root: '/root/xx',
        }
      )
    ).toEqual({
      resolve: {
        alias: { root: '/root/xx', umi: '/root/umi' },
      },
    });

    expect(
      await modifyWebpackAlias(
        {
          resolve: { alias: { '@': '/root/src', exist: 'exist' } },
        },
        {
          root: '/root/xx',
          exist: '/new',
        }
      )
    ).toEqual({
      resolve: { alias: { '@': '/root/src', root: '/root/xx', exist: 'exist' } },
    });
  });
});

describe('test chainWebpackAlias', () => {
  it('should get correct alias', () => {
    const config = new Config();
    const result = chainWebpackAlias(config, {
      root: '/root/xx',
      umi: '/root/umi',
    });
    expect(result.toConfig()).toEqual({
      resolve: {
        alias: { root: '/root/xx', umi: '/root/umi' },
      },
    });
  });
});
