import type { PathLike } from "node:fs";
import type { Match, Path } from "node-match-path";

import fs from "node:fs/promises";
import { match } from "node-match-path";

export interface RouteManifestEntry {
  readonly type: string;
  readonly href: string;
}

export type RouteManifest = Record<string, ReadonlyArray<RouteManifestEntry>>;

export type RouteMatcher = (url: string) => Match;

export function makePathMatcher(path: Path): RouteMatcher {
  return (url) => match(path, url);
}

export function matchPaths(
  matchers: ReadonlyArray<RouteMatcher>,
): (url: string) => { match: Match; index: number } | null {
  return (url) => {
    for (const [index, matcher] of matchers.entries()) {
      const match = matcher(url);
      if (match.matches) {
        return { match, index };
      }
    }
    return null;
  };
}

export async function getRouteMatcher(path: PathLike) {
  const file    = await fs.readFile(path, { encoding: "utf-8" });
  const json    = JSON.parse(file);
  const paths   = Object.keys(json).map((p) => [p, makePathMatcher(p)] as const);
  const matcher = matchPaths(paths.map(([, matcher]) => matcher));
  return (url: string) => {
    const match = matcher(url);
    if (match === null) {
      return null;
    }
    return json[paths[match.index][0]] as ReadonlyArray<RouteManifestEntry>;
  };
}
