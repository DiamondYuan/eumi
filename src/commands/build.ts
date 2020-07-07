import BaseCommand from "../baseCommand";
import Command from "common-bin";
import build from "../legacy/build";

class DevCommand extends BaseCommand {
  async _run({ cwd }: Command.Context) {
    await build({ cwd });
  }
}

export default DevCommand;
