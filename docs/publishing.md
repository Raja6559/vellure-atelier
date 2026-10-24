# Vellure Atelier — publishing record

Updated: 2026-10-24.

## Published and verified

- Repository: https://github.com/Raja6559/vellure-atelier (public, production branch main).
- Worker: `krelyvo-demo-vellure`, distinct from the main website and other demos.
- Public custom domain: https://demo-vellure.krelyvo.com/.
- First deployed Worker version: `40682919-d79c-482c-a8ca-23a6464906a4`.
- Public HTTPS page and hero image: HTTP 200. Concept notice and noindex metadata present.
- Public production browser suite: **14/14 passed** (16.0 seconds).
- Cloudflare injects its own same-origin /cdn-cgi/rum performance beacon. The no-submission test excludes only that infrastructure endpoint and still rejects every application write.
- Main website commit `e400abb` adds the verified demo link and updates Vellure's scope wording. Its `Workers Builds: krelyvo-studio-digital-growth` check succeeded.
- Public case-study link verified by keyboard at 390 and 1440px. It opens the correct demo in a new tab with no opener, and neither layout overflows.
- Ember, Meridian and Vellure case-study routes each return HTTP 200.

## Automatic Git deployment remains to connect

The demo is live from the verified manual Worker deployment. Future GitHub pushes are not yet verified to deploy this new Worker automatically.

1. In https://github.com/settings/installations/163081653, add `Raja6559/vellure-atelier` to Cloudflare's selected repositories while preserving existing selections.
2. Open the Vellure Worker settings in Cloudflare and connect the repository under Builds:
   https://dash.cloudflare.com/478089e47eaac028a4638dae2beb1e2b/workers/services/view/krelyvo-demo-vellure/production/settings
3. Use these settings:
   - Production branch: `main`
   - Repository root: `/`
   - Build command: `bun run build`
   - Deploy command: `npx wrangler deploy --config .output/server/wrangler.json`
   - Preview builds: disabled
4. Under **Builds → Build variables and secrets**, add the plain variable `BUN_VERSION=1.4.2`. Worker runtime variables do not control dependency installation.
5. After saving the connection, make a fresh documentation push and confirm `Workers Builds: krelyvo-demo-vellure` succeeds and produces a new deployed Worker version.
6. Recheck public HTTPS and update this record only after the automatic build succeeds.

## Scope

Vellure remains a fictional, self-initiated concept. No booking or contact service is connected. The existing main-site homepage, other demos and Agent Studio were not edited by this publishing task.

2026-10-24: Raja confirmed the repository connection is saved. This fresh documentation push verifies the automatic production build.

2026-10-24: Raja saved the Worker Builds repository connection and BUN_VERSION=1.4.2 under Builds. This fresh push verifies the completed settings.
