import React from "react";
import { Outlet, useLocation } from "react-router";

interface AppProps {
  readonly url?: string;
  readonly manifest?: ReadonlyArray<{ href: string }>;
}

export function App({ url }: AppProps) {
  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <Outlet />
    </React.Suspense>
  );
}
