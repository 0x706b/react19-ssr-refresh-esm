import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "./routes";

const root = document.getElementById("app");

if (!root) {
  throw new Error("Cannot find 'app' element.");
}

const router = createBrowserRouter(routes);

ReactDOM.hydrateRoot(
  root,
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
