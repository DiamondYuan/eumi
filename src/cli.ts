import "regenerator-runtime/runtime";
import Command from "common-bin";
import { join } from "path";

class Program extends Command {
  constructor() {
    super();
    this.yargs.scriptName("eumi");
    this.usage = "Usage: [command] [options]";
    this.version = require("../package.json").version;
    this.load(join(__dirname, "commands"));
  }
}

export default Program;
