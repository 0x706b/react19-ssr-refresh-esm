import type { Express } from "express";

import path from "node:path";
import url from "node:url";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

import webpackConfig from "../../webpack.config.js";

const mode = process.env.NODE_ENV === "production" ? "production" : "development";

const isDevelopment = mode === "development";

const compiler = webpack(webpackConfig);

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export function withDevMiddleware(app: Express): void {
  app.use(
    webpackDevMiddleware(compiler, {
      serverSideRender: true,
      publicPath: webpackConfig.output?.publicPath ?? "/",
      writeToDisk: true,
    }),
  );

  app.use(
    webpackHotMiddleware(compiler, {
      log: false,
      path: "/__webpack_hmr",
    }),
  );
}
