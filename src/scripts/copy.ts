import BaseCommand from "../cli";

class CopyCommand extends BaseCommand {
  async _run() {
    console.log("copy");
  }

  get description() {
    return "Copy File";
  }
}

export default CopyCommand;
