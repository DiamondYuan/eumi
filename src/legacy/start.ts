import { build } from "./webpack";
import * as path from "path";
import * as cp from "child_process";
import * as net from "net";
import { startRender } from "./renderer";

const getPort = require("get-port");

const mainHMR = require.resolve("./main_hmr");

class ElectronManager {
  private port: number;
  private main: string;

  constructor({ port, main }: { port: number; main: string }) {
    this.port = port;
    this.main = main;
  }

  start() {
    const mainEnv = Object.create(process.env);
    mainEnv.SOCKET_PORT = String(this.port);
    mainEnv.NODE_ENV = "development";
    const electronProcess = cp.spawn(
      require("electron").toString(),
      [`--require ${mainHMR}`, this.main],
      {
        shell: true,
        env: mainEnv,
      }
    );
    electronProcess.stdout.on("data", (e) => {
      console.log(e.toString());
    });
    electronProcess.on("exit", (code) => {
      if (code === 100) {
        this.start();
      }
    });
  }
}

async function start(webpackConfig: string, cwd: string) {
  process.env.NODE_ENV = "development";
  const config = require(webpackConfig);
  const SOCKET_PORT = await getPort();
  let socket: net.Socket | null;
  const server = net.createServer();
  server.on("connection", (_socket) => {
    socket = _socket;
    socket.setEncoding("utf-8");
    socket.on("close", () => {
      socket = null;
    });
  });
  server.listen(SOCKET_PORT);
  const send = startRender({
    cwd: cwd,
    APP_ROOT: "src/renderer",
    port: 8888,
    BROWSER: "NONE",
  });
  let electronManager: ElectronManager;
  build({
    dev: true,
    webpackConfig: config,
    callback: (_err, stat) => {
      if (_err) {
        console.log(_err);
        return;
      }
      const statJson = stat.toJson({});
      const errors = statJson.errors;
      if (errors.length > 0) {
        errors.forEach((message) => console.log(message));
        return;
      }
      const warnings = statJson.warnings;
      warnings.forEach((message) => console.log(message));
      const { outputPath, assets } = statJson;
      if (
        !outputPath ||
        !Array.isArray(assets) ||
        !assets.some((o) => o.name.endsWith(".js"))
      ) {
        return;
      }
      const assetName = assets.find((o) => o.name.endsWith(".js"))!.name;
      const outputFilePath = path.join(outputPath!, assetName);
      if (!electronManager) {
        electronManager = new ElectronManager({
          port: SOCKET_PORT,
          main: outputFilePath,
        });
        electronManager.start();
      } else {
        if (socket) {
          socket.write("exit");
        }
        send({ type: "hmr" });
      }
    },
  });
}

export default start;
