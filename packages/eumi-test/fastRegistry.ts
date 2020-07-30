import { extend } from 'umi-request';

const request = extend({});

const fastRegistry = async () => {
  const registry = ['https://registry.npmjs.org/', 'https://registry.npm.taobao.org/'];
  const response = await Promise.race(
    registry.map((url) => request(url, { parseResponse: false }))
  );
  return response.url;
};

export default fastRegistry;
