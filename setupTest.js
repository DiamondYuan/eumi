const { join } = require('path');
const { existsSync, mkdirSync } = require('fs');
const { execSync } = require('child_process');
const cwd = process.cwd();
const time = Date.now();
const eumi_test_tmpdir = join(cwd, '.eumi_test_tmpdir');
if (!existsSync(eumi_test_tmpdir)) {
  mkdirSync(eumi_test_tmpdir);
}
const CURRENT_EUMI_TMPDIR = join(eumi_test_tmpdir, String(time));
mkdirSync(CURRENT_EUMI_TMPDIR);
execSync(`yarn pack --filename ${join(CURRENT_EUMI_TMPDIR, 'eumi.tgz')}`, {
  cwd: join(__dirname, 'packages', 'eumi'),
});
console.log('CURRENT_EUMI_TMPDIR: ', CURRENT_EUMI_TMPDIR);
process.env.CURRENT_EUMI_TMPDIR = CURRENT_EUMI_TMPDIR;
