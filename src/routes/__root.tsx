import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "../styles.css?url";
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Vellure Atelier | A beauty concept by Krelyvo Studio" },
      {
        name: "description",
        content:
          "A little pause. A little you. An editorial beauty atelier concept by Krelyvo Studio.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { name: "theme-color", content: "#eed8d8" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: ({ children }: { children: ReactNode }) => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  ),
  component: Outlet,
  notFoundComponent: () => (
    <main className="error-page">
      <p className="eyebrow">Vellure Atelier</p>
      <h1>A different direction.</h1>
      <p>This page doesn't exist.</p>
      <a className="button" href="/">
        Return to Vellure
      </a>
    </main>
  ),
  errorComponent: () => (
    <main className="error-page">
      <h1>A moment to reconnect.</h1>
      <p>The page couldn't load.</p>
      <a className="button" href="/">
        Reload the experience
      </a>
    </main>
  ),
});
