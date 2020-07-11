import BaseCommand from '../baseCommand';
import Command from 'common-bin';
import { resolve, extname } from 'path';
import { exists, stat } from 'mz/fs';
import compressing from 'compressing';

const CompressDirMap = {
  zip: compressing.zip.compressDir,
};

const CompressFileMap = {
  zip: compressing.zip.compressFile,
};

type Packer = (source: string, target: string) => Promise<void>;

class PackCommand extends BaseCommand {
  constructor(rawArgv: string[]) {
    super(rawArgv);
    this.usage = 'Usage: eumi pack source_dir target_file';
  }
  async _run({ argv, cwd }: Command.Context) {
    const [source_file, target_file] = argv._;
    if (!source_file || !target_file) {
      return this.showHelp();
    }
    const sourcePath = resolve(cwd, String(source_file));
    const targetPath = resolve(cwd, String(target_file));
    const exist = await exists(sourcePath);
    if (!exist) {
      console.log('sourceDir not exist.');
      return;
    }
    const ext = extname(targetPath).slice(1);
    const packer = await this.packerFactory(sourcePath, ext);
    if (!packer) {
      console.log(`${ext} is not support.`);
      return;
    }
    await packer(sourcePath, targetPath);
  }

  private async packerFactory(source: string, ext: string): Promise<Packer | null> {
    const fileStat = await stat(source);
    if (fileStat.isDirectory()) {
      return CompressDirMap[ext];
    }
    if (fileStat.isFile()) {
      return CompressFileMap[ext];
    }
    return null;
  }

  get description() {
    return 'pack source_dir target_file';
  }
}

export default PackCommand;
