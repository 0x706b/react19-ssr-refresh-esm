import type { RouteObject } from "react-router";

import React from "react";

const Home  = React.lazy(() => import("./pages/Home.js"));
const About = React.lazy(() => import("./pages/About.js"));

export const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
];
