import { spawn } from 'child_process';
import { join } from 'path';

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

describe('test build project', () => {
  it('expect build success', async () => {
    const code = await build(example);
    expect(code).toBe(0);
  }, 300000);
});
