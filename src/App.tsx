import { createTheme, ThemeProvider } from "@mui/material";
import { StyledEngineProvider } from "@mui/styled-engine-sc";
import React from "react";
import { Outlet } from "react-router";

interface AppProps {
  readonly url?: string;
  readonly manifest?: ReadonlyArray<{ href: string }>;
}

const theme = createTheme({ palette: { mode: "dark" } });

export function App({ url }: AppProps) {
  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <StyledEngineProvider>
        <ThemeProvider theme={theme}>
          <Outlet />
        </ThemeProvider>
      </StyledEngineProvider>
    </React.Suspense>
  );
}
