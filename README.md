# Vellure Atelier

A standalone fictional beauty atelier concept by Krelyvo Studio. The retained salon image, blush/plum identity, and editorial copy extend the existing Vellure case study.

## Local development

Run in `D:\Raja\Business Work\Krelyvo Studio\portfolio-demos\vellure-atelier`:

```powershell
bun install --frozen-lockfile
bun run dev
```

Open http://127.0.0.1:8088/.

## Checks

```powershell
bun run typecheck
bun run test
bun run build
```

To test the production Worker locally, run `bun run preview` and open http://127.0.0.1:8089/. In another terminal, set `$env:DEMO_BASE_URL="http://127.0.0.1:8089"` and run `bun run test`.

## Scope

The services and appointment journey are illustrative. No booking, personal-data collection or contact action is connected. Supporting imagery is AI-generated; sources and prompts are recorded in docs/imagery.md.

- docs/design.md — approved design direction
- docs/implementation.md — Task 2 progress
- docs/verification.md — verification evidence
- assets/source — retained and generated source imagery
- public/images — responsive compressed images

Live demo: https://demo-vellure.krelyvo.com/. Repository: https://github.com/Raja6559/vellure-atelier (main). The public demo and main-site case-study link are verified. Automatic Git deployment for the new Worker still needs its Cloudflare Builds connection; follow docs/publishing.md. Use BUN_VERSION=1.4.2 under Builds settings.
