import { IApi } from '@umijs/types';

export default (api: IApi) => {
  api.chainWebpack((memo) => {
    memo.module.rule('js').include.add(process.cwd()).end();
    return memo;
  });
};
