import type { NextFunction, Request, Response } from "express";

import express from "express";
import path from "node:path";
import url from "node:url";

import { withDevMiddleware } from "./server/devMiddleware.js";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

const app = express();

withDevMiddleware(app);

app.use(express.static(path.join(dirname, "../dist"), { index: false }));
app.use(express.json());
app.use(express.urlencoded());

app.get("/*", (req, res, next) => {
  import("./server/routes/ssr.js").then(({ ssr }) => ssr(req, res, next));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.json(err);
});

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.info(`App started on port ${port}`);
});
