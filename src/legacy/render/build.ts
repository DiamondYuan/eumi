import "regenerator-runtime/runtime";
import { chalk, yParser } from "@umijs/utils";
import { Service } from "umi/lib/ServiceWithBuiltIn";
import getCwd from "umi/lib/utils/getCwd";
import getPkg from "umi/lib/utils/getPkg";

const args = yParser(process.argv.slice(2));

(async () => {
  try {
    const cwd = getCwd();
    const service = new Service({
      cwd: cwd,
      pkg: getPkg(process.cwd()),
    });
    await service.run({
      name: "build",
      args,
    });
  } catch (e) {
    console.error(chalk.red(e.message));
    console.error(e.stack);
    process.exit(1);
  }
})();
