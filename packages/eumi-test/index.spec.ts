import { spawn } from 'child_process';
import { join } from 'path';
import { Server } from 'http';
import { existsSync, copy, createReadStream, readJSON, writeJSON } from 'fs-extra';
import getPort from 'get-port';
import express from 'express';
import npminstall from 'npminstall';

const fixture = join(__dirname, '__tests__/fixture');
const example = join(fixture, 'example');

function build(cwd: string) {
  return new Promise((r) => {
    const cp = spawn('npm run build', {
      shell: true,
      cwd,
    });
    cp.on('exit', r);
  });
}

const eumi = join(process.env.CURRENT_EUMI_TMPDIR!, 'eumi.tgz');

let port: number = 0;
let server: Server;
beforeAll(async () => {
  port = await getPort();
  const app = express();
  app.get('/*', function (_req, res) {
    createReadStream(eumi).pipe(res);
  });
  await (async () => {
    return new Promise((r) => {
      server = app.listen(port, r);
    });
  })();
});

afterAll(() => {
  server.close();
});

describe('test setupTest.js', () => {
  it('expect CURRENT_EUMI_TMPDIR exist', () => {
    expect(typeof process.env.CURRENT_EUMI_TMPDIR === 'string').toBeTruthy();
    expect(existsSync(process.env.CURRENT_EUMI_TMPDIR!)).toBe(true);
  });
});

async function copyToRandomPath(source: string) {
  const randomPath = join(process.env.CURRENT_EUMI_TMPDIR!, Math.random().toString(36).slice(-8));
  await copy(source, randomPath);
  const json: any = await readJSON(join(randomPath, 'package.json'));
  json.devDependencies.eumi = `http://localhost:${port}/eumi.tgz`;
  await writeJSON(join(randomPath, 'package.json'), json, {
    spaces: 2,
  });
  const noop = () => {
    //
  };
  await npminstall({
    root: randomPath,
    registry: 'https://registry.npm.taobao.org',
    console: {
      info: noop,
      error: noop,
      log: noop,
      warn: noop,
    },
  });
  return randomPath;
}

describe('test build project', () => {
  it('expect build success', async () => {
    const randomPath = await copyToRandomPath(example);
    const buildCode = await build(randomPath);
    expect(buildCode).toBe(0);
  }, 300000);
});
