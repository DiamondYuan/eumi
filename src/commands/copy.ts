import BaseCommand from "../baseCommand";
import Command from "common-bin";
import { resolve } from "path";

class CopyCommand extends BaseCommand {
  constructor(rawArgv: string[]) {
    super(rawArgv);
    this.usage = "Usage: eumi copy source_file target_file";
  }
  async _run({ argv, cwd }: Command.Context) {
    const [source_file, target_file] = argv._;
    if (!source_file || !target_file) {
      return this.showHelp();
    }
    const sourcePath = resolve(cwd, source_file);
    const targetPath = resolve(cwd, target_file);
  }

  get description() {
    return "copy source_file target_file";
  }
}

export default CopyCommand;
