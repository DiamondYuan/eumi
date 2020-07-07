import { join } from "path";
import BaseCommand from "../baseCommand";
import Command from "common-bin";
import { spawn } from "child_process";

class StartCommand extends BaseCommand {
  constructor(rawArgv: string[]) {
    super(rawArgv);
    this.usage = "Usage: eumi pack source_dir target_file";
  }
  async _run({ argv, cwd }: Command.Context) {
    const main = join(cwd, "dist/main.bundle.js");
    spawn(require("electron").toString(), [main], {
      shell: true,
    });
  }
}

export default StartCommand;
