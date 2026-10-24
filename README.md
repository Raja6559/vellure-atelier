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

This local repository uses branch `feat/vellure-build`. GitHub publishing, the distinct Cloudflare Worker/custom domain, and linking the main case study are a later task. Use Bun 1.4.2 in Cloudflare Builds when publishing; its older default cannot read this lockfile.
