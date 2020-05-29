import BaseCommand from "../baseCommand";
import Command from "common-bin";

class CopyCommand extends BaseCommand {
  async _run({ env, ...rest }: Command.Context) {
    console.log("copy", rest);
  }

  get description() {
    return "Copy File";
  }
}

export default CopyCommand;
