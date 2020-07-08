import { fork } from "child_process";
import { build } from "./webpack";
import * as fs from "fs-extra";
import { join } from "path";

const umiBuild = require.resolve("./render/build");

async function cleanDist(distPath: string) {
  const files = await fs.readdir(distPath);
  await Promise.all(
    files.map(async (file: any) => {
      if (["package.json"].includes(file)) {
        return;
      }
      await fs.remove(join(distPath, file));
    })
  );
}

function buildRender(cwd: string) {
  const rendererEnv = Object.create(process.env);
  rendererEnv.APP_ROOT = "src/renderer";
  rendererEnv.NODE_ENV = "production";
  return new Promise((r) => {
    const cp = fork(umiBuild, [], {
      cwd,
      env: rendererEnv,
    });
    cp.on("exit", () => {
      console.log("exit");
      r();
    });
  });
}

function buildMain(config: any) {
  return new Promise((r) => {
    build({
      dev: false,
      webpackConfig: config,
      callback: (err, ee) => {
        if (err) {
          console.log(err);
          return;
        }
        const we = ee.toJson({});
        if (we.errors) {
          we.errors.forEach((error) => {
            console.log(error);
          });
          return;
        }
        console.log("build success");
        r();
      },
    });
  });
}

export default async function ({
  cwd,
  webpackConfig,
}: {
  cwd: string;
  webpackConfig: string;
}) {
  process.env.NODE_ENV = "production";
  const config = require(webpackConfig);
  const distPath = join(cwd, "dist");
  await cleanDist(distPath);
  await Promise.all([buildMain(config), buildRender(cwd)]);
}
