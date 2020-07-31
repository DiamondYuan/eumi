import { exists, readFile } from 'mz/fs';
import { dirname, resolve } from 'path';

interface AliasConfig {
  [key: string]: string;
}

export default async function tsconfigPathToWebpackAlias(configPath: string): Promise<AliasConfig> {
  if (!(await exists(configPath))) {
    return {};
  }
  let config: any;
  try {
    config = JSON.parse(await readFile(configPath, 'utf-8'));
  } catch {
    config = {};
  }
  const paths = config.compilerOptions?.paths ?? {};
  const baseUrl = config.compilerOptions?.baseUrl ?? '.';
  const alias: AliasConfig = {};
  const basePath = dirname(configPath);
  Object.keys(paths).forEach((item) => {
    const key = item.replace('/*', '');
    const value = resolve(basePath, baseUrl, paths[item][0].replace('/*', ''));
    alias[key] = value;
  });
  return alias;
}
