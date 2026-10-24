# Vellure Atelier — Task 4 publishing checklist

Status: prepared after Task 3 review on 2026-10-24. Nothing in this checklist has been deployed.

## Reviewed local project

- Folder: `D:/Raja/Business Work/Krelyvo Studio/portfolio-demos/vellure-atelier`.
- Implementation commit: `83b2829`, local branch `feat/vellure-build`.
- Production preview: http://127.0.0.1:8089/.
- 14/14 production browser tests pass. Review evidence: docs/verification.md.

## Proposed publishing targets

- GitHub repository: `Raja6559/vellure-atelier` (verify availability during Task 4).
- Production branch: `main`, containing the reviewed local implementation.
- Cloudflare Worker: `krelyvo-demo-vellure`, matching wrangler.jsonc.
- Custom domain: `demo-vellure.krelyvo.com`.
- Build command: `bun run build`.
- Deploy command: `npx wrangler deploy --config .output/server/wrangler.json`.
- Repository root: `/`.
- Under **Builds → Build variables and secrets**, set plain variable `BUN_VERSION=1.4.2` before the first Git build.
- Keep preview builds disabled for this portfolio demo.

## Publishing sequence

1. Confirm the local reviewed commit and clean state. Create this demo's separate GitHub repository and publish the reviewed snapshot.
2. Grant Cloudflare access to this repository while preserving existing selected repositories.
3. Add the custom-domain route and deploy the distinct Worker using the generated server config.
4. Connect Cloudflare Builds to the correct repository and main branch with the settings above.
5. Trigger a fresh push and verify the **Workers Builds: krelyvo-demo-vellure** GitHub check succeeds and creates a deployed Worker version.
6. Check public HTTPS, images, concept disclosure, noindex, HTTP 404, keyboard interactions, mobile layout and the production browser suite.
7. Only after the demo is live and checked, add its link to Krelyvo's existing Vellure case study and update the scope wording to reflect the completed single-page demo.
8. Verify the deployed main-site case study link and both deployment checks.

Preserve the other case studies, concept disclosures and existing sites. No homepage live-demo preview section is included. No booking, contact delivery or Agent Studio work is part of publishing this demo.
