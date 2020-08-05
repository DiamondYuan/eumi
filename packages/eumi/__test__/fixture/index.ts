import { resolve } from 'path';

export function getFixturePath(name: string) {
  return resolve(__dirname, name);
}
