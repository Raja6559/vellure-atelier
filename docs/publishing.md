# Vellure Atelier — publishing record

Updated: 2026-10-24. Task 4 complete.

## Published and verified

- Repository: https://github.com/Raja6559/vellure-atelier (public, production branch main).
- Worker: `krelyvo-demo-vellure`, distinct from the main website and other demos.
- Public custom domain: https://demo-vellure.krelyvo.com/.
- First manual Worker version: `40682919-d79c-482c-a8ca-23a6464906a4`.
- First verified automatic build: commit `eec6b59`, successful GitHub check `Workers Builds: krelyvo-demo-vellure`.
- Cloudflare build ID: `2b30d921-40e6-4d5d-a58e-beb87d738248`.
- Automatic deployment produced Worker version `34468f2c-db48-414b-a67c-a61d9194cb41`.
- Public page and hero image return HTTP 200 after the automatic deployment. The concept notice and noindex metadata remain present.
- Public production browser suite: **14/14 passed** during publishing verification.
- Main website commit `e400abb` adds the demo link and updates Vellure's completed scope. Its Cloudflare GitHub check succeeded.
- Public case-study link verified by keyboard at 390 and 1440px. It opens the correct demo in a new tab with no opener and no layout overflow.
- Ember, Meridian and Vellure case-study routes each return HTTP 200.

## Automatic production build settings

- Connected repository: `Raja6559/vellure-atelier`.
- Production branch: `main`.
- Repository root: `/`.
- Build command: `bun run build`.
- Deploy command: `npx wrangler deploy --config .output/server/wrangler.json`.
- Plain build variable: `BUN_VERSION=1.4.2` under Builds → Build variables and secrets.
- Future pushes to main trigger the connected production build.

The initial GitHub repository permission was separate from the Worker Builds connection. After Raja saved the Worker connection and Bun variable, a fresh push triggered and completed the automatic deployment.

## Scope and test notes

Vellure remains a fictional, self-initiated concept. No booking or contact service is connected. Cloudflare injects its own same-origin /cdn-cgi/rum performance beacon; the no-submission test excludes only this infrastructure endpoint and rejects all application writes.

The existing main-site homepage, other demos and Agent Studio were not edited by this publishing task.
