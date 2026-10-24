# Vellure Atelier — Task 1 design and motion specification

Date: 2026-10-24
Status: Approved for implementation when Raja requested Task 2 on 2026-10-24. Local implementation and imagery are complete; GitHub and Cloudflare publishing are later tasks.

## Intent

Create a standalone, single-page **fictional beauty atelier** concept that extends Krelyvo's existing Vellure Atelier case study. Show how a salon could express its personality, explain its services and guide visitors toward an appointment, without presenting an operating business or collecting enquiries.

Design read: a fashion-forward editorial beauty site for a style-conscious visitor, using an intimate studio atmosphere, expressive typography and deliberate, low-friction interaction. Keep the existing salon image and the current case study's self-expression language.

The page should feel distinct from Ember & Oak's warm restaurant story and Meridian's architectural presentation. Vellure's visual motif is the **mirror**: framing, reflection and a change of perspective. It must stay readable and useful without motion.

## Approaches considered

- **Editorial atelier (selected proposal):** one cinematic interior image, asymmetric typography, a concise service edit and a lookbook. This best matches the current case study and allows one memorable motion sequence without turning the page into a generic service grid.
- **Salon directory:** many service cards, prices and booking prompts. Easier to scan, but it would require invented operational details and dilute Vellure's identity.
- **Fashion campaign only:** striking imagery and motion with little service explanation. Visually strong, but weak as a credible website concept because visitors could not understand the proposed appointment journey.

## Visual system

- Core palette, anchored in the existing case study: deep plum `#382632`, shadow plum `#281A25`, soft blush `#EED8D8`, and pale ivory `#FFF4F0`. Use blush as a quiet field and plum as the primary text/CTA color; no rainbow gradients.
- Existing source image: `krelyvo-studio-website/src/assets/concept-salon.jpg`. Its violet-lit mirror, chair and shelves establish the lighting and materials. Do not replace it.
- Proposed display type: **Bodoni Moda** in carefully sized regular/italic styles for the fashion-editorial voice; **Inter** for navigation, controls and body text. Self-host with `font-display: swap`. If Bodoni proves too fragile at small sizes, use it only for large headings and keep all functional copy in Inter.
- Strong type scale, thin rules, asymmetric image frames, restrained arches echoing the salon mirror. Corners follow one rule: near-square content frames; softly rounded controls only where they signal interaction.
- A page width near 1440px, fluid side gutters, calm negative space and no repeated three-card feature layout. Maintain legibility at 320px and avoid text embedded in images.
- Design dials: variance 7/10, motion 5/10, density 3/10.

## Page journey and draft copy

### 1. Disclosure and navigation

Visible notice in normal flow: **“Fictional beauty atelier concept by Krelyvo Studio.”** Do not let it collide with navigation on a narrow phone.

Wordmark: **Vellure Atelier**. Navigation: **The Atelier**, **Services**, **The Edit**, and **Preview an appointment**. The CTA opens the preview dialog, not an external booking page. On mobile, use an accessible menu with expanded state, Escape dismissal and focus restoration. Anchors account for any sticky header height.

### 2. Hero — “A little pause. A little you.”

Supporting copy: **“A space for self-expression, considered details and a moment away from the everyday.”**

Place the existing interior photograph in a tall mirror-inspired frame beside or below the copy; keep the mirror and chair visible in the mobile crop. Primary action **Explore services** scrolls to the service edit. Secondary action **Preview an appointment** opens the dialog. The hero should not require a full-screen height or hide the next section on mobile.

### 3. The atelier — “Beauty, with a point of view.”

A short fictional introduction to a calm, expressive studio: time to consider a look, space to make it one's own. Pair the story with a close interior detail. Describe an imagined atmosphere, not a real location, staff credential, product partnership or opening hours.

### 4. Services — “Find your direction.”

A browsable **illustrative service edit** with three categories: **Hair**, **Colour**, and **Styling**. Each category reveals three concise example services or moments, for nine total. Draft entries:

- Hair: Cut & Shape; Texture & Movement; Finish & Polish.
- Colour: Tone Refresh; Dimension & Light; Creative Colour Consultation.
- Styling: Occasion Styling; Everyday Finish; Bridal Style Exploration.

Every entry has a one-sentence, non-technical description. The section states that services are **illustrative concept content**; there are no real prices, durations, treatment guarantees, availability or implied bookings. Category controls are buttons with clear selected state and keyboard access; all content remains discoverable without animation.

### 5. Signature visual sequence — “Your look. Your language.”

A three-part editorial lookbook: **The mood** (consultation/moodboard detail), **The craft** (hands/tools or hair texture detail), **The expression** (finished style portrait). This is a narrative, not a before-and-after or evidence of client results.

On desktop, images move through a restrained overlapping mirror-frame composition as the user scrolls; text stays in normal document flow. Unlike the previous two demos, avoid a long sticky image swap. A short transform/clip reveal and crossfade should be enough. On mobile and in reduced-motion mode, show three static image-and-text rows. No scroll hijacking or autoplay.

### 6. The space — “Make space for yourself.”

An asymmetric gallery mixing the retained interior image with two coordinated studio details. Gallery imagery may open a keyboard-accessible larger view with captions if the Task 2 build can keep it simple and robust; otherwise use non-interactive figures. All imagery has descriptive alt text and generated assets are labeled **AI-generated concept image**.

### 7. Appointment preview and footer

Heading: **“Your next moment starts with a conversation.”** The preview dialog explains the proposed steps: explore the edit → share a preferred direction → agree an appointment. It clearly says **“This is a concept preview. No appointment can be booked here.”** No fields, personal information, outbound requests, phone/WhatsApp links or dummy contacts.

Footer repeats the fictional disclosure and links back to `https://krelyvo.com/work/vellure-atelier`. Do not imply a real salon address, social account, staff team, testimonials, awards or operating schedule.

## Image direction for Task 2

Retain the existing source interior image. Generate five coordinated supporting concept images, guided by its plum lighting, curved mirror, polished metal and minimal shelving:

1. Studio detail — an oval mirror edge, chair, shelving and soft reflected light, consistent with the source space.
2. Consultation moodboard — material swatches, color references and a stylist's tools, with no legible generated text.
3. Craft detail — hands arranging hair or tools in a believable salon setting, without implying a real customer outcome.
4. Expression portrait — a consenting-looking fictional adult model with a distinctive finished hairstyle, photographed editorially; no before/after comparison.
5. Product/detail still life — unbranded bottles, comb and folded textile in the same material palette.

These are imagined visual directions. Avoid fake logos, illegible text, distorted hands, exaggerated treatment claims and inconsistent room architecture. Record prompts/provenance and label AI-generated visuals as concept imagery. Prepare responsive WebP variants around 640 and 1280px; add a larger hero variant only if image quality warrants it. Reserve dimensions, prioritize the hero, lazy-load below-fold images and review transfer sizes.

## Motion, interaction and accessibility

- Hero type enters once with a short opacity/translation reveal. The source photograph unveils gently, without flashing or a loading gate.
- Section entrances are brief and never gate content. Buttons and links use subtle color, underline or small translation feedback.
- Use GSAP only if the lookbook sequence needs coordinated transforms; ordinary hover and disclosure behavior can use CSS. Load motion separately and clean up triggers on unmount or breakpoint changes.
- `prefers-reduced-motion` disables scroll choreography and smooth scrolling. Default HTML/CSS shows all content if JavaScript or animation setup fails.
- Use semantic headings, a skip link, visible focus states, real buttons for interactive controls and descriptive image alternatives. The dialog traps focus, closes with Escape and returns focus to its trigger.
- Preserve native scrolling. No horizontal-scroll requirement, autoplay media, looping decorative movement or heavy 3D.

## Scope and implementation boundary

Proposed working folder: `D:/Raja/Business Work/Krelyvo Studio/portfolio-demos/vellure-atelier`, with its **own repository**. Task 2 can follow the proven React, TypeScript, Tailwind, TanStack Start and Cloudflare structure used by Ember & Oak and Meridian, while using Vellure-specific components, copy and styling. Include `noindex` from the start.

Task 1 does **not** change the main Krelyvo website, current Vellure case study, other concept demos or Agent Studio. A later publishing task can use `demo-vellure.krelyvo.com` and link it from the existing case study only after public verification. No homepage live-demo section is included.

No booking backend, enquiry delivery, analytics integration, payment, account system, staff profile, treatment results or client testimonials in this version.

## Verification criteria for later build tasks

- Review 320, 390, 430 and 1440px layouts, including the hero crop, display-type descenders, menu wrapping, sticky header and footer.
- Check category controls, mobile navigation, all anchors, preview triggers and any gallery controls with mouse and keyboard.
- Check dialog focus containment, Escape and restoration; verify it never sends a request or gathers personal data.
- Check reduced motion, no-JavaScript content visibility, lookbook behavior at desktop/mobile breakpoint changes and unknown-route handling.
- Verify fictional labels, noindex metadata, generated-image disclosures and no unsupported business claims.
- Run TypeScript, focused browser tests and a production build; inspect image loading and transfer sizes.
- After publishing, verify HTTPS, public assets and the case-study link before claiming the live demo is complete.

## Next task

**Task 2 — Build Vellure Atelier and create its coordinated concept image set.** Recommended model: **Sol · High**.