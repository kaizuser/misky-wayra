# Misky Wayra — project memory

Single source of truth for this project: what we decided, why, what exists, and what's next.
Rewritten Nov 12, 2026 to match the current site (the editorial redesign). Earlier states are in git history (`git tag v0.1-balance` marks the old "crafty" version).

---

## 1. Context and how to work

**The project.** A website for a family-run complex of cottages in **Capilla del Monte, Córdoba, Argentina**, owned and run by the developer's parents, who receive guests in person.

**The complex is called Misky Wayra** ("sweet wind" in Quechua). It started with the first house, Misky Wayra; Sumac Mayu ("beautiful river") was built later. Spelling used by the family: **Sumac Mayu** and **Misky Wayra** (not "Sumaq" / "Miski").

| Cottage | Building | Theme | Color |
|---|---|---|---|
| **Sumac Mayu** (bigger; listed on Airbnb as "Cabaña Misky Wayra II") | Orange hand-sculpted adobe house: domes, tower, wavy mushroom-cap eaves, large arched glass façade, stone base | `mayu` | adobe (terracotta) |
| **Misky Wayra** (the original) | Round house, lime-cream plaster, green corrugated roof with scalloped trim, stone base, wooden gallery | `wayra` | techo (green) |

Shared: 3,000 m² park with fruit and native trees, pool (in season), decks, fire pit, barbecue, gazebo, grapevine pergola, covered parking, view of the Cerro Uritorco.

**The developer.** Junior frontend developer in Córdoba (UTN; works on AngularJS + Java at his job; knows React). **Arch Linux**, **Node 26** from pacman (if builds break after `pacman -Syu`, check Node first), **npm**. Doesn't draw. Writes English and Spanish mixed. Site content is **Spanish (es-AR, voseo)**.

**Standing instructions:**
- **Commit and push without asking** (Nov 1, 2026): anything the developer asked for or approved in the conversation gets committed and pushed to `master` right away. Pushing redeploys the GitHub Pages preview. Still ask before anything not discussed, or before destructive git operations (force push, rewriting history, deleting branches).
- **Quality over quantity** (Nov 1, 2026): when we take something on, go deep and polish it until it's solid before moving on. Fewer, better changes.
- **Restraint:** add one detail at a time, check it on desktop and mobile, keep it only if it serves the place. If it competes with the photos, it goes.
- Objective, analytical answers with honest trade-offs; concrete files and code; mockups to judge ideas; no overengineering.
- Structure changes (pages, sections, their order) are discussed first and recorded in section 9.
- Only real content: reviews never invented or rewritten (only trimmed/accent-fixed); only photos the family has rights to; people in photos need consent.
- **The developer looks at the compiled site, not `astro dev`** (dev re-encodes every photo on request and is slow). After each change: `npm run build`, keep `npx astro preview --port 4322` running for him (http://localhost:4322), and commit + push so GitHub Pages has it too. Otherwise stop any server you start when done.

---

## 2. Concept and aesthetic

**The house is the brand.** Sumac's building is extraordinary; nothing in the area looks like it. The photos carry the site.

**Editorial aesthetic (since Nov 2, 2026), modeled on wolnylas.pl** (screenshots in `pagina-especifica/`, untracked): lots of air, big photos, a condensed high-contrast serif, a thin straight nav, thin rules, square buttons, minimal text. It replaced the first "crafty" aesthetic (eave dividers, arch/circle photo frames, volutas, dashed paths, Fraunces), which is in git history. The only remain is the 404's forked path, to be redone.

**Two houses, two colors.** Sumac = adobe (left when shown side by side), Misky = green (right). The complex itself is olive (`monte`). Houses differ by color, not by type weight.

---

## 3. Stack

| Choice | Why |
|---|---|
| **Astro 7**, static output | Content site, zero JS by default, fast on mobile data, hosting-agnostic. |
| **TypeScript strict** | Astro's strict preset. |
| **Native CSS** (scoped component styles, nesting, custom properties, `clamp()`) | Bespoke look; no Tailwind/Sass/framework. |
| **CSS animations first** | Scroll-driven animations as progressive enhancement (Firefox static). No GSAP. |
| **Contact = WhatsApp** | That's how bookings happen in Argentina. No booking engine, no forms, no backend. |

Packages: `astro`, `@astrojs/sitemap`, `photoswipe` (lightbox); dev: `prettier`, `prettier-plugin-astro`, `@astrojs/check`, `typescript`. `npm run check` = `astro check`.

### Gotchas (learned the hard way)
- **CSS minifier:** `astro.config.mjs` sets `vite.build.cssMinify: 'esbuild'`. Vite's default (lightningcss) folds `animation-timeline` into the `animation` shorthand, which Chrome rejects: scroll animations work in dev and vanish in the build. If they break after an upgrade, grep `dist/_astro/*.css` for `animation-timeline`.
- **Never write a nameless `animation` shorthand** (`animation: linear both;`): esbuild minifies it to `animation: none`. Use longhands or include the name.
- **One dev server per project (Astro 7):** `npm run dev` reuses a running one. Check with `npx astro dev status`, stop with `npx astro dev stop`. After changing the content schema, stop, delete `.astro/data-store.json`, start again (the build is never affected).
- **Grids that contain a scroll track** need `grid-template-columns: minmax(0, 1fr)`, or the track stretches the page sideways.
- **No zoom-out on phones** (developer's request): viewport `minimum-scale=1` and `html, body { overflow-x: clip }` (in `reset.css`). Zooming in stays allowed. Rotated elements count toward scroll width: `.seccion { overflow-x: clip }`.
- **Reveal script safety:** elements only hide when `revelar.ts` itself runs (it adds `.revelar` to `<html>`). An inline head class once hid all text forever when the hashed JS 404'd after a deploy (Pages caches HTML ~10 min).
- **YAML:** quote every `alt:` (alts with ": " broke parsing).
- **Headless Chromium tests:** profile dir under `/tmp/claude-1000/` (long socket paths fail); to test hover, launch with `--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4`. In a shell, run `pkill`/`kill` as its own command (it aborts the rest of a chain with exit 144).
- View transitions: test with `build` + `preview`, never `dev`.

---

## 4. Files

```
astro.config.mjs        site/base from env (SITIO_URL, SITIO_BASE), trailingSlash 'always', sitemap,
                        cssMinify esbuild, fonts: Instrument Serif (400, normal + italic) and Instrument Sans (400–700)
src/
├── config.ts           SITIO (name, WhatsApp placeholder, address split, redes), hayWhatsapp, whatsappUrl(), mapsUrl
├── content.config.ts   Zod schema for cottages (SEO limits, required alt, encuadre, equipamiento, resenas, recorrido)
├── content/cabanas/    sumac-mayu.md (orden 1), misky-wayra.md (orden 2): frontmatter only
├── data/relato.ts      the home story (principal + paradas with their composition); lorem until the texts arrive
├── lib/datos.ts        JSON-LD (LodgingBusiness for the home, Accommodation per cottage)
├── lib/rutas.ts        ruta() for every internal link (GitHub Pages subfolder), esVistaPrevia
├── layouts/Base.astro  <head> (fonts, SEO, OG 1200×630 JPG, JSON-LD, speculation rules), <main>, <Pie />
├── components/
│   ├── CabanaHero.astro  full-screen hero photo with name/meaning/phrase (home and cottages); prop transicion = view-transition-name
│   ├── Franja.astro      the site nav (+ scripts/franja.ts)
│   ├── Secciones.astro   the home story: main text + photo compositions
│   ├── Elegir.astro      home closing: the two houses side by side
│   ├── Ficha.astro       cottage data + grouped amenities
│   ├── Ambientes.astro   one carousel per room (+ scripts/carrusel.ts)
│   ├── Ampliable.astro   link that opens a photo in PhotoSwipe
│   ├── Resenas.astro     real guest reviews
│   ├── Reservar.astro    how to book + WhatsApp button
│   ├── OtraCasa.astro    link card to the sister cottage
│   ├── Pie.astro         footer
│   └── Emblema.astro     temporary emblem (completo | compacto)
├── scripts/            revelar.ts (triggered entrances), carrusel.ts, franja.ts, lightbox.ts
├── pages/              index, cabanas/[slug], galeria, ubicacion-y-contacto, 404, robots.txt.ts
├── assets/             home/hero.jpg (home hero), home/hero-sumac.jpg (default OG image), cabanas/<slug>/*.jpg
└── styles/             tokens.css → reset.css → global.css (import order matters)
public/favicon.svg      compact emblem
```

Folder is `cabanas` (no ñ: it gets percent-encoded when shared).

---

## 5. Pages

**Home (`index.astro`) = the story told with photos:** `CabanaHero` (brand name, "Capilla del Monte · Córdoba", pool/deck/Uritorco photo) → `Franja` → `Secciones` (content from `src/data/relato.ts`) → `Elegir` → footer. It currently uses Sumac's photos and lorem text; it will tell both houses (it started in Misky, then Sumac, the park, the surroundings) once texts and photos are chosen.

**`Secciones` (the home story):**
- **Main text:** a big centered phrase in Instrument Serif (house color) + a small paragraph, triggered entrance.
- **Compositions** (`disposicion` per parada), all built on an 80vw scale breaking out of the content axis, gray placeholders until photos exist:
  - `trio`: three tall 2:3 photos at staggered heights, slightly overlapping; scroll-scrubbed and reversible (shared view timeline `--trio`): they open outward and upward.
  - `cinco`: five 4:5 photos, three on top, two below centered on the gaps; staggered triggered entrance.
  - `cruz`: three columns, 3:4 photos at the sides, two 5:6 stacked in the taller middle column.
  - `escalones`: two parallel staircases running right to left through the center, three steps of paired 4:5 photos.
- **Expressive title** `titular: escalera`: the word split into stacked rotated pieces ("Ad·en·tro"), huge, `aria-hidden` (the real `h2` is `.solo-lectores`).
- **`nota`**: a title + subtitle after the photos; `estilo: final` = the big left-aligned closing block near the screen edge.
- **Phones:** every composition becomes a one-photo-per-screen carousel with counter and arrows (`[data-carrusel]`).
- Reference font is OT Miniature (OffType, commercial); Instrument Serif stands in. If a web license is bought, self-host it and change `--font-display`/`--font-principal`.

**Cottage pages (`cabanas/[slug].astro`) are informative:** visitors there are comparing and deciding. Same structure for both:
1. `CabanaHero` (`100svh`; parallax: photo `translateY` 0 → 33% and scale 1.06 → 1 over the first screen, text fades out; static in Firefox/reduced motion) + `Franja`.
2. **De un vistazo** (`Ficha`): surface, guests, bedrooms, beds as big serif figures between thin rules; amenities grouped Adentro / Afuera / Incluido (`equipamiento`; falls back to `comodidades`).
3. **One carousel per room** (`Ambientes`, fed by `recorrido`): number + name, counter ("1–2 / 6" on desktop) and square arrows over a thin rule. Native scroll-snap (`scroll-snap-stop: always`); JS only for arrows and counter. **Exactly two 4:5 photos on desktop, exactly one on phones**, symmetric margins (`--margen`). Tap opens PhotoSwipe. Gray placeholders only when a room has no photos.
   - Sumac: La casa · El living comedor · La cocina · La cúpula (the playroom under the dome) · Los dormitorios · El baño.
   - Misky: La casa y la galería · El living comedor · La cocina · Los dormitorios · El baño.
   - **Only the house and its rooms.** Garden, pool and park belong to the Galería (Misky's gallery is its own porch, so it stays).
4. **Lo que dicen los huéspedes** (`Resenas`): three real reviews per house (Misky from Booking, Sumac from Airbnb), serif quotes in three columns; first name, date, source.
5. **Cómo reservar** (`Reservar`): "¿Te imaginás acá?", three steps (Escribinos / Confirmás / Llegás), square WhatsApp button in the house color with a prefilled message.
6. **La otra casa** (`OtraCasa`): large photo of the sister house, name in its color, whole card is the link.

**Galería (`galeria.astro`, done Nov 12, 2026):** the grounds. Don't say the spaces are shared: some aren't (the developer's call); the eyebrow "Lo que comparten las dos casas" and the closing "Por dentro…" line were removed.
- **When the full-resolution photos arrive, the cover becomes a full-screen hero** like the home and cottages (`CabanaHero` format) — the developer's call.
- **Opening:** title block bottom-left (huge "Galería" + one line) next to a tall vertical cover photo on the right (Jardin_03, red roses with Sumac's dome out of focus; `prioridad` = eager + `fetchpriority="high"`, it's the LCP). Phones: text, then the photo at content width. Every photo is vertical 1080px, so no full-bleed landscape crop (it would look soft).
- **Three groups:** El parque · La pileta · El fogón y las pérgolas, each with the Ambientes-style head (number, big name, one line, thin rule) and six 2:3 photos. No carousel: you come here to see everything.
- **Desktop: three staggered columns aligned at the top** (no hole under the rule): the middle column's first photo is taller (2:3.6) and the right one's a bit (2:3.3), the extra absorbed by a negative bottom margin (% of width); the following photos of those columns shift down by the same amount (`translateY` 20% / 10% of their own height). The step only shows at the bottom.
- **Phones: one photo per row with rhythm** (full width, 72% on the right, 72% on the left): each photo gets its own screen; two small columns showed too much at once.
- Each group is one `[data-galeria]` for PhotoSwipe; slow zoom on hover.
- Photos in `src/assets/galeria/` (18 of the 22 garden/pool shots + the cover; Jardin_01 and Pileta_04 are already in Sumac's carousel, Jardin_07 repeats Jardin_06). No "Las vistas" group: only Jardin_11 shows the Uritorco well, so it opens La pileta.

**Ubicación y contacto (redone Nov 12, 2026):** same language as the Galería.
- **Opening:** h1 "Ubicación y contacto" as a small olive label, the street huge in Instrument Serif ("Los Alazanes 1077"), "Barrio Valentí · Capilla del Monte · Córdoba", then square buttons "Abrir en Google Maps" (filled) and "Copiar la dirección" (outline, fills on hover; only shown if the clipboard API exists; "Copiado" status). Next to it, the tall Uritorco photo (Jardin_11, `prioridad`). Phones: stacked, full-width buttons.
- **Cómo llegar** and **Qué hay cerca:** big serif head over a thin rule, then rows between thin rules (label in small caps or place name in serif on the left, text on the right; stacked on phones).
- **Escribinos:** closing like "Cómo reservar": label, big olive "Escribinos", one line, WhatsApp button. Phone and Instagram are not repeated here (the footer has the socials).
- **Texts to confirm with the family:** RN 38 / ~110 km / ~2 h from Córdoba, direct buses to Capilla's terminal, Uritorco "the highest of the Sierras Chicas" and ~3 h ascent, Los Terrones "on the way to Ongamira", Ongamira "half an hour by car". Written conservatively; no distances from the cottages.

**404:** uses `Franja` and the footer but still has the old aesthetic (forked dashed path): to be redone.

### Nav (`Franja.astro` + `scripts/franja.ts`), on every page
- A thin full-width strip (~42px) right under the hero (at the top on pages without one): cottages on the left, compact emblem centered (3.2rem), Galería / Ubicación y contacto on the right, small uppercase Instrument Sans.
- In place it's part of the page (no background). Once scrolled past it becomes fixed and shows **only when scrolling up** (frosted cream, `blur(14px)`), hides when scrolling down (6px threshold).
- Hover: the link's color fades in (0.6s) as a full-height block, text turns cream; cottages in their house color, the rest olive.
- **Phones: one nav only.** "Menú" · emblem · "Consultar" (WhatsApp, house color). "Menú" opens a full-screen native popover with the four links in the strip's type, a square close cross and a WhatsApp bar (light dismiss, Esc, no JS).
- `aria-current="page"` from `Astro.url.pathname`.

### Footer (`Pie.astro`) and home closing (`Elegir.astro`)
- Footer: a closing, not a menu (no page links). Compact single row on sand: full-color emblem (5.5rem), "Misky Wayra" in the nav's type, "Dos casas de adobe frente al Uritorco. Te esperamos.", social links (`SITIO.redes`, Instagram placeholder), "© year · Capilla del Monte, Córdoba". A dark footer with link columns was rejected as corporate.
- Elegir: "Dos casas, un mismo parque / Elegí la tuya.", both houses side by side (stacked on phones): 4:5 photo, meaning · guests · m², name in the house color, "Conocer la casa →".

### Shared behavior
- **Motion protocol (Nov 12, 2026), like a palette: every content element except the hero enters with one of three roles** (`global.css`, triggered by `revelar.ts`):
  - **Texto** (`data-revelar`): titles, phrases, paragraphs, figures, reviews. Fade 0.7s + rise from 7rem below over 1.1s, `cubic-bezier(0.16, 1, 0.3, 1)`.
  - **Foto** (`data-revelar="foto"`): a slow fade only (1.4s), no movement. In carousels each photo fades in as it slides into view.
  - **Detalle** (`data-revelar="detalle"`): buttons, carousel controls, standalone labels, the footer. Fade 0.6s + a small rise (1.25rem).
  - Proportion: mostly photos (still fades), then text (rises), few details. **At most one special movement per page** (the hero's parallax, the home trío opening with the scroll). Stagger with `--retraso` in 0.08–0.12s steps, up to ~0.4s.
  - They're CSS **animations, not transitions**: an element's own hover transition used to override the entrance (the "Consultar" button appeared static).
  - `.visible` is added when the element peeks above the bottom 12% of the screen (one observer) and removed only once it's fully below the screen again (a second observer without margin: the first one fires while crossing its line, still on screen, and never again, so resets were random), so entrances replay on every pass down and photos leaving a carousel sideways stay visible. Whatever is on the first screen at load enters right away, even in the bottom 12% band (checked again after fonts and images load). Elements only hide when the script runs (`.revelar` on `<html>`). Reduced motion: a 0.4s fade for everything (`!important` beats the reset's 0.01ms).
  - **Exception: the home story (`Secciones`)** keeps its own motion, exactly as approved: composition photos (cinco, cruz, escalones) rise like text (`data-revelar`), the trío opens with the scroll, and in the mobile carousels the photos are static. The full-screen hero (`CabanaHero`) also keeps its own.
- **Every photo opens full screen** (`Ampliable` + `lightbox.ts`): each composition/track is one `[data-galeria]`; Spanish UI; background `--color-deep` of the page theme; **no caption** (removed Nov 12, 2026: it didn't look good; the alt stays for screen readers and Google); full-size WebP ≤2048px. The PhotoSwipe CSS is imported in `Ampliable.astro` (it once lived in a deleted component and the viewer broke: no close cross, an invisible layer catching clicks). Launcher ~5 KB gz; the viewer (~17 KB gz) loads on first tap. Placeholders open a gray slide.
- **Page transitions:** native cross-document view transitions (`@view-transition`, only with `prefers-reduced-motion: no-preference`), whole page cross-fades 550ms. Each cottage hero has `view-transition-name: casa-<slug>`; the home hero is `hero-inicio`. Speculation Rules prerender `/cabanas/*` on hover (Chrome).

### Cottage facts (from the family's texts)
- Address: **Los Alazanes 1077, Barrio Valentí, Capilla del Monte**.
- **Misky Wayra:** adobe, 80 m², 2 bedrooms (king + two singles), full kitchen with electric oven, living-dining with TV, WiFi and streaming, Ñuke salamandra + heaters, gallery with country table and barbecue, independent entrance, covered parking, alarm, bedding and towels. 4–5 guests.
- **Sumac Mayu:** adobe, 140 m², 3 bedrooms (one king, two with singles), full kitchen, living-dining with TV, WiFi and streaming, salamandra, 50 m² playroom under the dome, pergola, barbecue, small greenhouse, independent entrance, covered parking, alarm, bedding and towels. Up to 6 guests.
- Booking: 40% deposit by transfer, rest on arrival (official exchange rate of the day); DNI and address for the invoice. **No prices on the site.**
- **WhatsApp format:** `https://wa.me/549` + area code without 0 + number without 15, `?text=` + `encodeURIComponent(...)`.

---

## 6. Design system

### Palette v3 (`tokens.css`)
| Group | Token | Hex | |
|---|---|---|---|
| Complex | `--cal` | `#F4ECDF` | page background (Misky's lime plaster) |
| | `--arena` | `#E4D5BC` | the only surface |
| | `--monte` | `#5B6130` | olive |
| | `--tinta` | `#2B2119` | text (warm brown, never black) |
| Sumac | `--adobe` / `--brasa` | `#9C4219` / `#4A1E0E` | |
| Misky | `--techo` / `--sombra` | `#2A674C` / `#183A2C` | |

Components use **roles only**: `--color-bg`, `--color-text`, `--color-surface`, `--color-primary`, `--color-accent`, `--color-deep`, `--color-on-color`. `data-theme="mayu" | "wayra"` (any element) swaps primary/accent/deep; default is the complex (`monte`, `tinta`). Contrast verified: on cal monte 5.6, adobe 5.6, techo 5.7; on arena all ≥ 4.5. The WhatsApp button uses `--color-primary`, never WhatsApp green; the WhatsApp icon is a generic chat bubble.

### Typography
- **Instrument Serif** (`--font-display`, `--font-principal`): titles, main texts, house names, figures. One weight (400); never ask for 600+ (faux bold). Real italic loaded; only the upright is preloaded.
- **Instrument Sans** (`--font-body`, variable 400–700): body, nav, buttons, data.
- Fluid scale `--step--1` … `--step-5`. Measure 65ch.

### Spacing and layout
- `--space-3xs` (0.25rem) … `--space-3xl` (6rem); `--space-section` fluid 3 → 7rem.
- `--axis-width: 72rem`, fluid `--gutter`.
- Breakpoints: mobile < 40rem, tablet 40–64rem, desktop ≥ 64rem.
- `main > section` spans full width; content stays on the axis via `padding-inline: max(var(--gutter), (100% - var(--axis-width)) / 2)`. `.banda` = surface background (unused right now).

### Emblem (temporary, `Emblema.astro`)
From the developer's `Frame.svg`: Sumac's body in a terracotta gradient, the dome, the arched window. Full color (an illustration, not `currentColor`). `compacto` drops the plants and fine lines (favicon, nav). The definitive emblem is still open; when it changes, only `Emblema.astro` and `public/favicon.svg` change.

---

## 7. Requirements, SEO, deploy

- **Performance:** CWV good on a mid-range Android over 4G; Lighthouse mobile ≥ 95; hero ≤ ~200 KB; JS ≤ 30 KB gz outside the lightbox viewer.
- **Accessibility:** WCAG 2.2 AA, one `<h1>` per page, keyboard navigable, Spanish alt on every photo (schema enforces it), reduced motion respected.
- **Responsive:** mobile-first from 360px; most traffic comes from WhatsApp/Instagram links.
- **Privacy:** no cookies, no trackers.
- **SEO in code:** title/description (schema: ≤ 60 / ≤ 160), canonical, Open Graph (1200×630 JPG via `getImage`; cottages use their hero), JSON-LD (`src/lib/datos.ts`; `telephone` only once the real WhatsApp number exists, `hayWhatsapp`), sitemap, `robots.txt.ts`, `trailingSlash: 'always'`.
- **SEO outside code (highest impact):** Google Business Profile (start before the site is finished), reviews from every guest, Search Console once the domain exists, identical name/address/phone everywhere (Google, Booking, Airbnb — Sumac is "Misky Wayra II" there; must match).
- **Preview deploy:** GitHub Pages at https://kaizuser.github.io/misky-wayra/, built by `.github/workflows/vista-previa.yml` on every push to master (Node 24) with `SITIO_URL`, `SITIO_BASE=/misky-wayra`, `VISTA_PREVIA=1` (noindex + robots Disallow). Locally: `SITIO_URL=https://kaizuser.github.io SITIO_BASE=/misky-wayra VISTA_PREVIA=1 npm run build`. Final: a `.com.ar` domain (NIC Argentina), hosting to decide.

---

## 8. Photos

- **Photo session delivered (Nov 12, 2026):** 95 edited JPGs from the family's photographer (zips in `fotos-drive-cabañas/`, extracted to `fotos-originales/drive/`, both gitignored): `Sumac` 41, `Misky` 32, `Jardin_y_Pileta` 22. All vertical **1080×1620 exports**, soft in full screen: **full resolution requested** (1707×2560 verticals / 2560×1707 horizontals, JPG 85–90 sRGB, same names). When they arrive, replace the files in `src/assets/cabanas/<slug>/` with the same names.
- Two edit styles: a newer warm, shallow-depth series (Sumac dormitorio_06–13, detalle_lampara, bano_03) is excellent; the rest (most of Misky) is saturated HDR with wide-angle distortion → one consistent, warmer, less saturated grade is pending.
- In use: the cottage carousels (copied as-is, lowercase names). Best garden/pool picks for the home story and the Galería: Jardin_11 (Uritorco), Jardin_12, Jardin_08, Jardin_09, Pileta_01, Pileta_03, Fogon_02, Jardin_05.
- Temporary heroes: home `src/assets/home/hero.jpg` (pool, deck and the Uritorco from Sumac's roof), Sumac `hero-sumac.jpg` (IMG_0389 frontal façade, also the default OG image), Misky `cabanas/misky-wayra/hero.jpg` (IMG_0416).
- Rules: start from originals (never WhatsApp copies); masters in `src/assets` ≤ 2560px (JPEG q88 via sharp; bigger files make `astro dev` slow); Astro generates AVIF/WebP. Remove distractions (hose, car, neighbors' roofs) where possible.

---

## 9. Explored and rejected (don't repeat)

- **The "crafty" aesthetic as a whole** (Oct–Nov 1, 2026): eave dividers (`Alero`), arch/circle photo frames with outlines, volutas along a trip line, dashed paths, Fraunces + Figtree, per-house type weights. Replaced by the editorial aesthetic (Nov 2). Code in git history (`v0.1-balance` and later).
- **Cottage page as a "trip"** (numbered stops along a drawn line) and then as photo compositions ("secciones"): the compositions moved to the home; cottage pages became informative (visitors there compare and decide).
- **Old home** (story hero with arch/circle windows, Encuentro, Frente a frente comparison table, Lo que comparten, ¿Cuándo venís?): replaced by the photo story.
- **Floating pill nav + mobile thumb bar** (`Nav.astro`): replaced by the strip; one nav on phones.
- **Emblem drawn with code** (several sketches): too stiff. Temporary `Frame.svg` emblem in use.
- **Hero options:** single arch with the Uritorco (too minimal), one arch split in two (too small), B1 two photos with eave edges (too generic, "too AI-generated").
- **Title over the sky** in heroes: white clouds kill contrast. Cottage heroes put the text low, over a gradient that only touches the ground.
- **Gradient blend between two different photos:** muddy middle; use a clean cut.
- **Fraunces `WONK` axis:** does nothing in upright styles.
- **Nav hover ideas** (underlines, dots, etc.): all rejected; the full-height color fade was chosen.
- **Dark footer with link columns:** too corporate. A big centered footer: too tall.
- **Embedded Google Maps iframe:** heavy; a link that opens the Maps app instead.
- **Online check-in, booking engine, forms, published prices:** no.
- **Next.js, Vue, React islands, Tailwind, Sass, GSAP:** not needed.

---

## 10. Backlog

**Next (agreed Nov 12, 2026, in this order unless the developer says otherwise):**
1. **404** in the editorial style.
2. **Lighthouse audit** (performance, accessibility) on home and cottage pages; cap the JPG fallback `<Picture>` generates.
3. **Color grade** proposal for the HDR photos.
4. Small details: mobile "Consultar" message per cottage, real OG images per page, review years.

**Waiting on the family / photographer:** full-resolution photos; the home story texts (`src/data/relato.ts`); WhatsApp number, phone, Instagram username; years for the Daniela and Juan Pedro reviews; confirm beds (Sumac 1 king + 4 singles? Misky's 5th guest?), the streaming list, whether to show the 40% deposit step, and the names on Google/Booking/Airbnb.

**Later / ideas:**
- Home story with both houses (Misky first, then Sumac, the park, the surroundings).
- Unlisted `/tu-llegada` guest page (`noindex`): check-in/out, exact directions, what to bring, rules, local tips.
- Definitive emblem (maybe a designer).
- "The page feels alive" (ambient motion, the place's real time of day, a night wink to the Uritorco UFO lore): only after structure and photos are final. Rules: almost subliminal, never moves text being read or the WhatsApp button, `transform`/`opacity` only, off under reduced motion, no sound.
- Texts for "Qué hay cerca" and "Cómo llegar".
- `.node-version` with `26` at the repo root.
