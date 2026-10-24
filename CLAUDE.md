# Misky Wayra — project memory

Single source of truth for this project: what we decided, why, what exists, and what's next.
Paste this file at the start of a new conversation to resume work.

---

## Milestones

### v0.1 — Balance point (October 11, 2026)
The project reached stability: the concept, the design system and the main structure are agreed and working. From here on the work is **polishing what exists**, not redefining it.

**Agreed and built at this point:** the axis concept (Sumac left, the complex at the center, Misky right); palette v2 (now v3) and the role/theme system; Fraunces + Figtree; full-bleed layout with `.banda`; the `Alero` eave divider; hero B1 (two houses, eave edges, hover growth); the functional nav with the temporary emblem, the off-axis menu and the mobile thumb bar; the page sketches; this file.

**Rule from here:** the **structure is fixed**: pages, sections and their order, the left / center / right axis, components and what each one does. **Redesigns are welcome**: shape, look and feel of any piece can change (e.g. a new shape for the nav, same functionality). If the structure itself ever needs to change, discuss it first and record why in section 10.

**Principle: restraint.** The site can keep growing, but carefully. Add one detail at a time, check it on desktop and mobile, and keep it only if it serves the place and the visitor. If a detail competes with the photos or the content, it goes. Better a few memorable details than many small effects.

Git: `git tag v0.1-balance` marks this state.

---

## 1. Context

**The project.** A website for a family-run complex of cottages in **Capilla del Monte, Córdoba, Argentina**. Owned and run by the developer's parents, who receive guests in person.

**The complex is called Misky Wayra** ("sweet wind" in Quechua). It started with the first house, Misky Wayra; Sumac Mayu ("beautiful river") was built later. Story line for the home page: *"Todo empezó en Misky Wayra."*

**The two cottages** (a third may come later):

| Cottage | Building | Side of the axis | Theme |
|---|---|---|---|
| **Sumac Mayu** (main, also once called "Miski Wayra II") | The orange hand-sculpted adobe house: domes, cylindrical tower, wavy mushroom-cap eaves, large arched glass façade with iron mullions, irregular stone base | **Left** | `mayu` |
| **Misky Wayra** (the original) | Round house with warm lime-cream plaster, green corrugated roof with scalloped trim, stone band at the base, wooden doors and windows | **Right** | `wayra` |

Spelling used by the family: **Sumac Mayu** and **Misky Wayra** (not the standard Quechua "Sumaq" / "Miski").

**Shared spaces** (from the photos): pool with stone retaining wall, two decks (one with shade cloth pergola), fire-pit circle with benches on gravel, barbecue, jasmine-covered wrought-iron gazebo, metal arched pergola with grapevine, large garden with algarrobos, olive tree, agaves and cacti, garden paths of green cement with pink stones, covered parking. Clear view of the Cerro Uritorco from the property.

**The developer.** Junior developer in Córdoba, studies at UTN, works mostly frontend on a legacy AngularJS 1.x + Materialize app with a Java backend. Knows React. Uses **Arch Linux**, **Node 26** from the pacman `nodejs` package (risk: a system update can jump to an odd, non-LTS major; if builds break after `pacman -Syu`, check Node first). Uses **npm**. Doesn't know how to draw.

**How to work with the developer.** Wants objective, analytical answers and honest trade-offs. Likes concrete files and code, and visual mockups to judge ideas. Doesn't want overengineering. Writes in English and Spanish, often mixed. Site content is in **Spanish (es-AR, voseo)**.

---

## 2. Concept

**The essence: the house is the brand.** Sumac Mayu's building is extraordinary and nothing in the area looks like it. The site must represent and transmit that.

**The axis.** The site is organized around a central vertical axis:
- **Center:** the complex (earth, garden, monte). Calm.
- **Left:** Sumac Mayu. **Right:** Misky Wayra. They mirror each other and complement each other.
- Practical pages (Galería, Ubicación y contacto) live **off the axis**, at the side.
- Symmetry carries the layout; motion carries the life (pure symmetry alone feels static).

**The shape language comes from Sumac's façade:**
- **The eave (alero):** thick organic curve, highest at the center, drooping at the ends. Used as the section divider.
- **The arch:** the glazed window under the eave. Its central mullion is literally the site's axis.
- **Misky's own shape: the circle.** Misky is a round house with a scalloped roof trim, so its window is round with a scalloped (festón) green edge. Sumac = arch + eave, Misky = circle + scallop. Each side of the axis has its own shape (added Oct 24, 2026: before, every shape came from Sumac and the right side read as "the same in green").
- **The stone base** and the **garden paths** (green cement + pink stones): future textures/patterns.

**Elements:** earth at the center; Sumac = water (mayu), Misky = wind (wayra). Water is the weaker link: the only visible water is the pool (no river/stream confirmed). Motion language idea: flowing for water, drifting for wind.

---

## 3. Stack and why

| Choice | Why |
|---|---|
| **Astro** (current stable, 7.x line) | Content site. Static HTML, zero JS by default, very fast on mobile data. React only as islands if ever needed (none needed so far). |
| **TypeScript strict** | Comes with Astro's strict preset. |
| **Native CSS, no preprocessor, no framework** | Native CSS has nesting, custom properties, `clamp()`, container queries. Astro scopes component styles. No Tailwind/Sass/Bootstrap: the site must look bespoke. |
| **CSS animations first** | Scroll-driven animations work in Chrome/Edge and Safari (since Sept 2025); Firefox behind a flag → progressive enhancement. **No GSAP in v1**; add only if CSS can't do something. |
| **Static output** | No backend, no DB, no forms: nothing to break, nearly free hosting, hosting-agnostic. |
| **Contact = WhatsApp + phone** | That's how bookings happen in Argentina. No booking engine, no online check-in, no forms (maybe a form later via external service, only if the parents ask). |

**Rejected:** Next.js (overkill), Vue/Angular (no benefit), React for now (no component state needed), Tailwind/Sass, GSAP v1, embedded Google Maps iframe (heavy; use a link that opens the Maps app), online check-in (needs backend + personal data handling).

### Installed packages (7)

| Package | Role |
|---|---|
| `astro` | Framework (brings sharp for images and Zod for schemas). |
| `@astrojs/sitemap` | Generates the sitemap at build. Needs `site` in config. |
| `photoswipe` | Gallery lightbox with pinch-zoom. The only JS that reaches the browser. Not wired yet. |
| `prettier` (dev) | Formatter. |
| `prettier-plugin-astro` (dev) | Teaches Prettier the `.astro` format. |
| `@astrojs/check` (dev) | Runs `astro check` (type-checks `.astro`/`.ts`). |
| `typescript` (dev) | Compiler used by `@astrojs/check`. |

Built in (no install): `astro:assets` images, `astro/zod`, Fonts API, `<ClientRouter />` view transitions, CSP API.

**CSS minifier:** `astro.config.mjs` sets `vite.build.cssMinify: 'esbuild'`. Vite 8's default (lightningcss) folds `animation-timeline` into the `animation` shorthand, which Chrome rejects, so every scroll-driven animation (trip line, stops, nav) silently disappeared in the build while working in `dev`. If scroll animations break after an upgrade, grep `dist/_astro/*.css` for `animation-timeline`.

`.prettierrc` uses `prettier-plugin-astro` with an override `parser: "astro"` for `*.astro`. `package.json` has `"check": "astro check"`.

Suggested: add `.node-version` with `26` at the repo root.

---

## 4. Current files

```
astro.config.mjs        site (placeholder https://miskywayra.com.ar), sitemap, fonts (Fraunces + Figtree via fontsource)
.prettierrc
src/
├── assets/home/
│   ├── hero-sumac.jpg    IMG_0389 (original file)
│   └── hero-misky.jpg    IMG_6442 (ground level, under the algarrobo, brick path to the gallery)
├── assets/cabanas/
│   ├── sumac-mayu/adobe.jpg      IMG_0400
│   └── sumac-mayu/jardin.jpg     IMG_0388
├── components/
│   ├── CabanaHero.astro  cottage hero: meaning + name + phrase, full-bleed photo with eave edges, view-transition-name casa-<slug>
│   ├── Recorrido.astro   the trip: numbered stops along a line on the axis, alternating sides, arch-masked photos, "Foto en camino" placeholder
│   ├── Alero.astro     eave divider; props fill, flip, cap (cap fills the area ABOVE the curve)
│   ├── Emblema.astro   temporary emblem (Sumac with dome), full color, variante completo|compacto, unique gradient IDs per instance
│   ├── Hero.astro      home hero "La historia": story title + two chapters (Misky round window, Sumac arch) joined by a path on the axis
│   └── Nav.astro       functional nav: sticky eave bar + emblem dome, utility links off-axis (popover on small screens), mobile thumb bar
public/favicon.svg      compact emblem, square viewBox
├── layouts/Base.astro  <html>/<head>, fonts, CSS imports, header, footer, data-theme on <body>
├── pages/
│   ├── index.astro
│   ├── galeria.astro           photo gallery (sketch)
│   ├── ubicacion-y-contacto.astro
│   └── cabanas/[slug].astro    one page per cottage from the content collection (old static pages deleted)
├── content/cabanas/
│   ├── sumac-mayu.md     data + texts (orden 1)
│   └── misky-wayra.md    data + texts (orden 2)
├── content.config.ts   Zod schema for cottages (SEO limits, required alt text, encuadre)
├── config.ts           SITIO (name, WhatsApp number, address), whatsappUrl(), mapsUrl
└── styles/
    ├── tokens.css      all design decisions (palette, roles, themes, type, spacing, layout, --alero-alto)
    ├── reset.css       minimal reset + global prefers-reduced-motion
    └── global.css      base element styles + page layout (uses only tokens)
```

Import order in `Base.astro` matters: `tokens.css` → `reset.css` → `global.css`.
Folder is `cabanas` (no ñ): ñ in URLs gets percent-encoded when shared.

### Base.astro
- Props: `title`, `description`, `theme?: 'wayra' | 'mayu'`.
- `<Font cssVariable="--font-fraunces" preload />` and `--font-figtree`.
- Renders `<Nav />` (see Nav below).
- Footer: "Misky Wayra, Capilla del Monte, Córdoba" + WhatsApp link placeholder.

### Nav (functional version, `Nav.astro`)
- **Concept:** the nav is the eave over the hero's window: Sumac Mayu on the left wing, Misky Wayra on the right wing, the emblem in the center as the dome (it overflows the bar). Utility links (Galería, Ubicación y contacto) live off the axis, at the right edge.
- **States:** at the top of the page it's open (transparent, larger emblem); while scrolling it condenses into a floating sticky pill (cream, blur, soft shadow). Done with a CSS scroll-driven animation (`animation-timeline: scroll(root)`); browsers without support (Firefox) always show the floating pill.
- **Current page:** `aria-current="page"` computed from `Astro.url.pathname`; the active wing is underlined.
- **Utility links:** one `<nav popover>`: visible as small links on desktop (≥ 64rem, author CSS overrides the UA popover styles); behind a round menu button below 64rem (native popover: light dismiss, Esc, no JS).
- **Mobile (< 40rem):** top shows only the emblem; a fixed thumb bar at the bottom: Sumac Mayu | WhatsApp in a raised circle (the dome, `--color-primary`) | Misky Wayra. `body` gets bottom padding so the bar never hides content. WhatsApp icon is a generic chat bubble (don't reproduce the WhatsApp logo).
- **Nav ↔ hero:** hovering a cottage name in the nav zooms that house's photo in the hero (and turns Misky's scalloped edge slightly, the wind) via `:global(body:has(...))` in `Hero.astro`.

### Cottage pages (`cabanas/[slug].astro`) — "the trip"
The developer's direction: each cottage page is a **trip / a path** that takes the visitor from outside into the house's interior, its magic and essence, and back out. (This redefined the cottage page sections; the rest of the site's structure is unchanged.)
1. **La llegada** (`CabanaHero`): meaning in Quechua (small caps, accent color), name (h1), one phrase; full-bleed photo with eave edges top and bottom. **The window opens on arrival:** on load, the photo opens from its house's window shape (`abrir-redonda` for Misky, `abrir-arco` for Sumac, keyframes in `global.css`) to the full rectangle, 900ms. It runs on direct loads (WhatsApp links) and inside the view transition from the home, since the transition's new image is live (the transition itself no longer animates the clip).
2. **El recorrido** (`Recorrido`, prop `tema`): numbered stops (01, 02…) joined by a line. **Each house moves differently** (Oct 24, 2026): Sumac (water) = a continuous wavy line (SVG mask tile), stop content rises from below; Misky (wind) = a straight dashed line (gusts), stop content drifts in sideways toward the axis. **Volutas:** between stops, on the line, a flourish blooms (`src/lib/volutas.ts`, clothoid strokes computed at build time, zero JS): Sumac = a wave crest that curls (plus a foam curl); Misky = two long gusts that curl only at the end. Mirrored on desktop, right side only on mobile. Drawn with `stroke-dashoffset` (`pathLength=1`) on a `view()` timeline; the line is revealed with `clip-path`, never `scale`, so waves and dashes don't stretch. Reference images in `ideas/` (corner scrollwork; pattern2 is a watermarked stock image, reference only). **Drawn stays drawn:** a small inline script in `Recorrido` (the site's first JS, ~0.5 KB) watches the scroll-driven animations; when one reaches the end it gets `.quieto` (`animation: none`, the natural state is the finished drawing), so scrolling back up never erases anything and the whole trip is drawn after a full scroll. The line uses `entry 50% exit 50%` so its tip follows the middle of the screen. Under `prefers-reduced-motion` none of this runs: the page is static and complete. **Window shapes in the trip:** Sumac's main photos are arches; Misky's are round with the scalloped edge (`lib/formas.ts` `feston()`, shared with the home hero), which turns slightly as the stop arrives (wind). Stops are spaced by `--entre: 7rem`, where the volutas live. Content of every stop arrives from the outer side toward the axis (the number stays still): Misky straight sideways (wind), Sumac sideways and rising, diagonal (water). **The closing (`.cierre`):** after the last stop the line ends in a knot where a larger voluta blooms, mirrored also downward like a corner ornament (pattern1). In Sumac the two halves are pulled apart 14px so the wave curls don't tangle. Distance from the last stop: `--cierre` (1.2 × `--entre`, 1.45 in Sumac, which is taller). This is the trip's "y de vuelta afuera". **Hover (mouse only, `(hover: hover)`):** Sumac photos come closer slowly (scale 1.06 over 1.8s, water settling); Misky photos sway once (`mecer`, ±0.8°) and the scalloped edge turns 8° (a gust). On touch nothing happens: a tap will open the photo full screen once PhotoSwipe is wired (`gallery`). To test hover in headless Chromium, launch with `--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4` (headless reports `hover: none`). Desktop: the line is the central axis, stops alternate text/photo on each side, text aligned toward the axis. Mobile: line at the left, stops stacked. The line draws itself and stops fade/rise in while scrolling (CSS `view()` timelines, progressive enhancement). Main photo of each stop is arch-masked (`shape-arch-mask` started here); extra photos go below as squares; no photo → "Foto en camino" placeholder.
   - Sumac stops: La casa, Adentro, La cocina, El descanso, El playroom, Afuera.
   - Misky stops: La casa, Adentro, La cocina, El descanso, La galería.
   - **Only photos of the cottage itself and its interiors.** No grounds, pool or park: those live in the Galería. After the trip, one line points there ("El parque, la pileta y los espacios compartidos te esperan en la galería de fotos").
3. **De un vistazo** (`.banda` between eaves): mirrored `<dl>` (surface, guests, bedrooms, beds) + amenities as pills.
4. **Consultar:** "¿Te imaginás acá?", 3 booking steps (write on WhatsApp with dates and people → 40% deposit by transfer → rest on arrival), button with a prefilled message per cottage.
5. **Del otro lado del eje:** card of the sister cottage (its own `data-theme`), arch-topped photo, meaning + name.

Content lives in `src/content/cabanas/*.md` (frontmatter only). Texts were rewritten from the family's WhatsApp descriptions: voseo, short, factual, no prices.

### Cottage facts (from the family's texts)
- Address: **Los Alazanes 1077, Barrio Valentí, Capilla del Monte**. Park of **3,000 m²** with fruit and native trees, panoramic view of the hills. Pool in season (shared).
- **Misky Wayra:** adobe, 80 m², 2 bedrooms (king size + two single beds), full kitchen with electric oven, living-dining with TV, exclusive WiFi and streaming at no cost, Ñuke salamandra stove + heaters in every room, gallery with a large country table and barbecue, independent entrance, covered parking, alarm, bedding and towels included. Up to 4–5 guests.
- **Sumac Mayu** (called "Misky Wayra 2" in the family's texts): adobe, 140 m², 3 bedrooms (one king size, two with single beds), full kitchen, living-dining with TV, WiFi and streaming, salamandra, 50 m² playroom with sofas, pergola with seats, barbecue, small greenhouse, independent entrance, covered parking, alarm, bedding and towels included. Up to 6 guests.
- Booking policy (family): 40% deposit by bank transfer, rest on arrival (adjusted to the official exchange rate of the day); they ask for DNI and address to issue the invoice. Prices are NOT published.

### Page transitions (`ux-details` 1 and 2) — done
- Native **cross-document view transitions**, no JavaScript: `@view-transition { navigation: auto; }` in `global.css`, only with `prefers-reduced-motion: no-preference`. Unsupported browsers (Firefox) just navigate normally.
- The home hero photos and each cottage hero share `view-transition-name: casa-sumac-mayu` / `casa-misky-wayra`. **The window opens:** the new photo arrives with its window's shape (`clip-path: inset(0 round 50%)` for Misky, the arch for Sumac) and opens to the full rectangle while it grows (750ms); the old photo fades in 200ms. The cottage hero's eave edges fade in at 400ms, once the window is almost open. Photos use `object-fit: cover` during the morph.
- The whole page cross-fades, so theme colors blend between pages. Duration 550ms, soft ease-out.
- `Nav` (`cabecera`, `pulgar`) has its own names so it stays still while the page changes.
- The sister card has no transition name on purpose (an off-screen morph would fly down the page).
- The eave edges (`.borde.arriba` / `.borde.abajo` in `Hero` and `CabanaHero`) have their own names (`borde-arriba`, `borde-abajo`), so they stay on top of the photo during the morph. Without them the photo showed as a plain rectangle and the curved edges popped in at the end (fixed).
- The home halves and the cottage hero use the same `widths` (`[640, 1024, 1600, 2048]`) so the destination photo can come from cache. `Base.astro` adds Speculation Rules (`prerender`, `moderate` = on hover) for `/cabanas/*`, so in Chrome the cottage page and its photo are ready before the click. Without that, the morph started before the photo had loaded and landed on an empty frame. Test transitions with `build` + `preview`, never in `dev`.
- To inspect a transition frame by frame: Chrome DevTools → More tools → Animations → set speed to 10%.

### Emblem (temporary, `Emblema.astro`)
- From the developer's `Frame.svg`: Sumac's body in a terracotta gradient, the dome with three small arched windows, the dark green arched window with cream mullions (center one = the axis), ground, two plants. Cropped viewBox `94 118 312 222`.
- Full color (not `currentColor`): it's an illustration, it doesn't take theme colors.
- `variante="compacto"` drops the plants and the fine lines; the favicon uses that version.

### Pages (sketches with placeholders in brackets)
- **index:** `<Hero />` → El complejo (`.banda`) → `<Alero flip />` → Nuestras cabañas (two themed cards, Sumac left / Misky right) → mirrored comparison table (attribute in the center column) → "El parque" teaser linking to the Galería → `<Alero />` → Contacto (`.banda`).
- **cabanas/[slug]:** see the "Cottage pages" section.
- **galeria:** "Galería de fotos": everything that is not on a cottage page, grouped: El parque, La pileta, Los espacios compartidos, Las vistas. Sketch; photos pending (`page-galeria`).
- **ubicacion-y-contacto** also has "Qué hay cerca" (Cerro Uritorco, Los Terrones, Ongamira, El pueblo, El cielo de noche), the content of the old Alrededores page, kept for visitors and SEO.
- **ubicacion-y-contacto:** address, static map + "Abrir en Google Maps" link, how to get there, WhatsApp / phone / Instagram.

**WhatsApp format:** `https://wa.me/549` + area code without 0 + number without 15, `?text=` + `encodeURIComponent(...)`. Phone: `tel:+549...`.

---

## 5. Design system

### Palette v3: the earth and one color per house (Oct 24, 2026)

Reduced from v2 at the developer's request (the hero mockup's restraint felt more characterful). One shared ground and surface for the whole site; each house brings only its color and its shadow.

| Group | Token | Hex | Source |
|---|---|---|---|
| Complex (center) | `--cal` | `#F4ECDF` | Misky's lime plaster. Page background everywhere. |
| | `--arena` | `#E4D5BC` | The only surface (bands), on every page |
| | `--monte` | `#5B6130` | Olive of the monte |
| | `--tinta` | `#2B2119` | Text (warm dark brown, never black) |
| Sumac Mayu (left) | `--adobe` | `#9C4219` | Terracotta adobe |
| | `--brasa` | `#4A1E0E` | |
| Misky Wayra (right) | `--techo` | `#2A674C` | Green roof (darkened from v2's `#2B6A4E` to pass 4.5:1 on arena) |
| | `--sombra` | `#183A2C` | The green in the shade of the trees |

Dropped from v2: `--uritorco`, `--teja-clara`, `--agapanto`, `--cielo`, `--viento`, `--noche`. The pastel surfaces (teja-clara, cielo) read generic; the blue accents split each side into two colors. Trade-off: the water (agapanto) and wind (viento) accents are gone; elements now live in shape and motion, not color.

**Roles** (components only use roles, never raw colors): `--color-bg`, `--color-text`, `--color-surface`, `--color-primary`, `--color-accent`, `--color-deep`, `--color-on-color`.

| Role | Default (`tierra`, the complex) | `mayu` | `wayra` |
|---|---|---|---|
| bg | cal | cal | cal |
| text | tinta | tinta | tinta |
| surface | arena | arena | arena |
| primary | monte | adobe | techo |
| accent | monte | adobe | techo |
| deep | tinta | brasa | sombra |
| on-color | cal | cal | cal |

`data-theme` works on any element (custom properties inherit): `<body>` on cottage pages, cards on the home page, nav links.

**Contrast (verified):** on cal: monte 5.6, adobe 5.6, techo 5.7; on arena: monte 4.55, adobe 4.53, techo 4.63; text and deeps > 8.6:1 everywhere.

**Color protocol:** components use roles only; ~60% surface / 30% theme / 10% accent; 4.5:1 for text, 3:1 for large text/UI; the WhatsApp button uses `--color-primary`, never WhatsApp green; the home center is always the complex theme.

### Typography
- **Fraunces** (headings): soft, slightly irregular variable serif, feels handmade like the house. Used large, light weights. The served file is Fontsource's full-axes variable font (wght, opsz, SOFT, WONK). `body` and every `[data-theme]` set `font-variation-settings: 'SOFT' var(--suavidad)` (re-declared per theme because the property inherits already computed; Figtree ignores it). **Each house has its type trait** (Oct 24, 2026): headings and names use `font-weight: var(--peso-titulo)`. Complex 500 / SOFT 100; Sumac = clay, 620 / SOFT 100 (heavier, softer); Misky = air, 380 / SOFT 50 (lighter). **Real italic** is loaded (`styles: ['normal', 'italic']`, +146 KB) but only the upright is preloaded (`preload={[{ style: 'normal' }]}` in `Base.astro`); the italic downloads only on pages that use it (today the home: the h1 *Misky Wayra.* and the chapter numbers). Before this, italics were synthesized (slanted upright).
- **Figtree** (body): clean, friendly, rounded details, readable on small phones, full Spanish characters.
- Why not system fonts: Android (most visitors) lacks the serif stack → inconsistent brand.
- Fluid scale `--step--1` … `--step-5` with `clamp()`. h1 = step 5, h2 = step 3, h3 = step 1, body = step 0. Headings weight 500, color `--color-deep`. Measure 65ch.

### Spacing and layout
- Fixed scale `--space-3xs` (0.25rem) … `--space-3xl` (6rem); fluid `--space-section` (3rem → 7rem).
- `--axis-width: 72rem`, fluid `--gutter`, `--radius: 0.75rem` (temporary).
- **Breakpoints:** mobile < 40rem, tablet 40–64rem, desktop ≥ 64rem (CSS can't use variables in `@media`).
- **Full-bleed sections:** `main > section` spans full width; content stays on the axis through `padding-inline: max(var(--gutter), (100% - var(--axis-width)) / 2)`. `.banda` = section with `--color-surface` background.
- Vertical rhythm: `main section > * + *` gets `--space-s` top margin.

### Alero (eave divider) — done
- `src/components/Alero.astro`, inline SVG, `preserveAspectRatio="none"`, mirrored symmetric path, highest at the center.
- `<Alero />` before a `.banda`; `<Alero flip />` after it. `fill` prop, default `var(--color-surface)`.
- Height token `--alero-alto: clamp(1.5rem, 0.25rem + 6vw, 7.5rem)` in `tokens.css` (raise the max for more drama). Flatter on mobile by design.
- Use only at major transitions (2–3 per page).

---

## 6. UX decisions

- **Pages:** `/`, `/cabanas/sumac-mayu`, `/cabanas/misky-wayra`, `/galeria`, `/ubicacion-y-contacto`, plus unlisted `/tu-llegada` (guest info sent via WhatsApp after confirming: check-in/out times, exact directions, what to bring, rules, local tips).
- **Rule:** WhatsApp reachable in ≤ 2 taps from anywhere.
- **No prices on the site** ("Consultá tarifas") — prices change too often in Argentina. Confirm with the parents.
- **Specs live on each cottage page** + a mirrored comparison table on the home page. No separate specs page.
- **Mobile:** the horizontal axis becomes vertical (centered column). Planned: a centered Mayu | Wayra switch, cottages stacked (not tabs, so the second isn't hidden), WhatsApp bar fixed at the bottom center, utility links in a menu.
- **Desktop hover idea:** hovering a cottage side makes it grow slightly; clicking opens its page; later a view transition morphs it into the cottage hero.
- **Naming:** the brand and a cottage are both "Misky Wayra". Title the cottage page differently (e.g. "La casa Misky Wayra") to avoid confusion.

---

## 7. Non-functional requirements

- **Performance:** Core Web Vitals "good" on a mid-range Android over 4G (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1). Lighthouse mobile ≥ 95. Hero image ≤ ~200 KB. JS ≤ 30 KB gz outside the gallery.
- **Accessibility:** WCAG 2.2 AA, semantic HTML, one `<h1>` per page, keyboard navigable, Spanish alt text on every photo, `prefers-reduced-motion` respected (already global in `reset.css`).
- **Responsive:** mobile-first from 360px. Most traffic comes from links in WhatsApp/Instagram.
- **Compatibility:** evergreen browsers (last 2) + iOS Safari. Animations are progressive enhancement; the site works without JS.
- **Reliability/security:** fully static, HTTPS, CSP via Astro's API.
- **Privacy:** no cookies, no trackers → no cookie banner.
- **Maintainability:** adding a cottage = one Markdown file + one photo folder (after `cabana-collection`). Tokens in one file. Minimal dependencies.
- **Portability:** static `dist/`, hosting decided later.

---

## 8. SEO plan

**In code:** real domain in `site`; `Base.astro` builds title, description, canonical, Open Graph (the WhatsApp link preview is the first impression; one OG image per cottage), JSON-LD `LodgingBusiness`; Zod schema enforces SEO title ≤ 60, description ≤ 160, alt text on every photo (build fails otherwise); `public/robots.txt` pointing to `sitemap-index.xml`; fast semantic pages; original text (never copied from Booking).

**Outside code (highest impact):** Google Business Profile (eligible because the parents receive guests in person; use the real name, signage at the entrance, lodging category, photos, hours) + asking every guest for a review (QR in the cottage) and answering all reviews; Google Search Console (verify, submit sitemap); identical name / address / phone everywhere (site, Google, Instagram, Booking, Airbnb, tourism guides). Realistic targets: the Maps pack, searches by name, and long-tail searches ("cabañas de adobe Capilla del Monte", "cerca del Uritorco"). Start the Google profile before the site is finished.

---

## 9. Photos

**General rules:**
- Start from **originals** (never WhatsApp-compressed copies; send them as documents or via Drive). Originals live in `fotos-originales/` (gitignored, same folder structure). `src/assets/...` holds masters resized to 2560px max (JPEG q88, via sharp): 8 MB 4032px originals made `astro dev` re-encode for ~1.5–5s per image on every request. Astro generates AVIF/WebP sizes from the masters.
- The current edits are heavily saturated/HDR → apply **one consistent, warmer, less saturated grade** to everything used on the site. Side-by-side photos (hero) must match exactly.
- Remove distractions where possible: blue hose on the grass, the car in the carport, neighbors' tile roofs.
- The orange roof edge in the foreground of the aerial shots can work as a frame ("you're standing on the adobe house").
- People in photos need consent.
- Only photos the family took (or has rights to) can be published.

**Photo map (file → what it shows → where it goes):**

| File | Shows | Use |
|---|---|---|
| IMG_0389 | Sumac frontal façade, arch centered, olive tree, tower + solar heater + barbecue at the sides | **Hero, Sumac half.** Emblem reference (near-symmetric façade). Crop on the window. |
| IMG_0388 | Sumac angled, pool corner, agapanthus and flowers in front | Sumac page / shared spaces |
| IMG_0387 | Sumac with granite stone wall in the foreground, shallow focus | Sumac page; stone texture reference |
| IMG_0400 | Sumac close-up: adobe wall, wooden corbels, stone base, glass door | Sumac page; `texture-adobe` / `pattern-path` reference |
| IMG_6442 | Misky at ground level, framed by an algarrobo branch: scalloped roof trim, tile band (azulejos) over the stone base, gallery with table, brick path and a green arched trellis leading in, pool glimpse at the right | **Hero (Misky's round window) and Misky's cottage hero** since Oct 24, 2026. Small water tank on the roof. |
| IMG_0416 | Misky round house, green roof, Uritorco and sierras behind; shot from Sumac's roof; water tank tower, car, hose | Was the Misky hero until Oct 24, 2026. Galería (Las vistas) at most. |
| IMG_0436 | Misky from above with tank tower and car | Backup only |
| IMG_0439 | Misky + Uritorco + Sumac's orange roof in the foreground + pool deck | Galería (El parque / Las vistas) |
| IMG_0431 | Uritorco centered, large sky, garden, people on the deck in a corner | Galería (Las vistas), strong opener for the page (was the first home hero, rejected as too minimal) |
| IMG_0451, 0449, 0446, 0444, 0443, 0441, 0433 | Pool, decks, fire pit and garden from Sumac's roof, Uritorco behind (~6 near-identical) | Galería (La pileta / El parque): pick the best 2–3, they are near-identical (IMG_0433 most pool-centered, IMG_0451 widest with the mountain) |
| IMG_0435 | Garden, olive tree, gazebo, barbecue, Sumac roof edge, distant sierras | Galería (Los espacios compartidos) |
| IMG_0392 | Metal arched pergola with grapevine | Galería (Los espacios compartidos; another arch) |
| IMG_0390 | Jasmine-covered wrought-iron gazebo with chairs, Sumac behind | Galería (Los espacios compartidos) |
| IMG_0370 | Agapanthus in the foreground, pool, a person, Misky behind | Galería (La pileta); source of the `agapanto` color |

**Missing photos (priority order):**
1. **Hero pair:** both houses shot frontally, same height (ground level), same time of day (golden hour), same lens; car moved, hose away, tank tower framed out if possible. The most important shot of the site.
2. Interiors of both cottages (main room, bedroom).
3. Golden hour / night (starry sky ties to astrotourism).
4. Texture close-ups (adobe plaster, stone base, garden paths).
5. Ideally, an angle with Sumac and the Uritorco together.

---

## 10. Explored and rejected (don't repeat)

- **Emblem drawn with code (sketches A "arco", B "arco y cerro", C "mínimo")** — too stiff and geometric.
- **Emblem traced from IMG_0389, mass-and-void with dome + seam + drooping eave + plinth** — still not expressive enough; developer didn't connect with it.
- **Hero: single arch with the Uritorco photo** — too minimalistic; doesn't show the houses.
- **Hero: one arch split in two (Sumac | Misky) with a mullion** — the arch is too small and the shape didn't connect.
- **Fraunces `WONK` axis for Sumac** (Oct 24, 2026): the served file has the axis (0–1, default 1) but it changes nothing in the upright styles at any optical size (measured: identical glyphs and widths). Its wonky forms live in the italic. Replaced by the clay/air weight + SOFT trait.
- **Hero B1** (title on cream + full-bleed band of two photos with eave edges, hovered side grows): built and used until Oct 24, 2026, replaced by "La historia". Felt too generic ("too AI-generated"): centered, symmetric, no idea driving the layout.
- **Hero option B2** (photos fill the first screen, title on a plaque over the seam) — B1 was preferred.
- **"No standalone gallery page"** was reversed by the developer: the Alrededores page became the **Galería de fotos** (grounds, pool, shared spaces, views). Cottage pages keep only the cottage and its interiors. The surroundings content moved to "Qué hay cerca" in Ubicación y contacto.
- **Title over the sky** — white clouds behind the title kill contrast; a dark scrim would spoil the sky. Title goes on the cream background (or on a cream plaque).
- **Gradient blend between the two hero photos** — different skies/horizons would create a muddy middle; use a clean cut (the mullion) instead.

---

## 11. Backlog

### Done
| Name | Notes |
|---|---|
| `nav-functional` | `Nav.astro` + `Emblema.astro` + favicon. |
| `cabana-collection` | Content collection + `cabanas/[slug].astro`; old static cottage pages deleted. |
| `cottage-trip` | Cottage pages as a trip (see Cottage pages). Pending: real interior photos. |
| `ux-details-1-2` | Hero → cottage morph and cross-page color fade (native view transitions). |
| `config` | `src/config.ts`: one place for WhatsApp number, address, Maps link. |
| `identity-buildings` | Sumac = orange adobe house (left), Misky = round green-roof house (right), complex = Misky Wayra. |
| `palette-v3` | Section 5 (reduced from v2). |
| `type-final` | Fraunces + Figtree via Fonts API. |
| `layout-full-bleed` | Full-width sections, content on the axis, `.banda`. |
| `shape-eave` | `Alero.astro`, pronounced, `--alero-alto` token. |

### In progress
| Name | Status |
|---|---|
| `home-hero` | **"La historia" chosen and built (Oct 24, 2026), replaces B1.** Eyebrow "Cabañas de adobe en Capilla del Monte" (keeps the keywords), h1 *"Todo empezó en Misky Wayra."* left-aligned, a short intro. Then two chapters: **I · La primera casa** (Misky, right, round window with a scalloped green edge) and **II · La que vino después** (Sumac, left, arch with the eave on top and the mullion in the center). Desktop: two columns, a dashed line on the axis joins them, the story continues next to Sumac ("Después, del otro lado del parque, se levantó Sumac Mayu." + family line + WhatsApp button). Mobile: stacked, Misky aligned right, Sumac left, a dashed S-curve between them. Hover: photo zooms, Misky's scallops turn slightly. The path draws itself while scrolling (desktop: the axis line, `scroll(root)` over the first 60vh; mobile: the S-curve, `view()`), revealed with `clip-path` so the dashes don't stretch. Pending: the family line, photo grade. |
| `emblem-arch` | **Temporary emblem in use** (developer's `Frame.svg`, see Emblem). The definitive emblem is still open: more expressive, low noise; maybe a designer. When it changes, only `Emblema.astro` and `public/favicon.svg` change. |

### Unaddressed
| Name | Description |
|---|---|
| `nav-design` | The functional nav is built (see Nav). Pending: a **differential design of its own** for the nav, not just a pill: its own shape and personality from the place (ideas: the bar's silhouette as the real roofline with the dome rising at the center; the wings as the eave; the menu opening like an arch). Developer expects this to come up later. |
| `shape-arch-mask` | The arch as a mask/frame for photos (cottage pages, galleries). Not for the home hero anymore. |
| `texture-adobe` | Subtle grain/texture from the adobe plaster for backgrounds. |
| `pattern-path` | Subtle pattern from the garden paths (green cement + pink stones) and the stone base. |
| `motion-language` | One orchestrated load moment; water motion (flowing) vs wind motion (drifting); durations, easing; reduced motion. CSS first. |
| `image-system` | Photo selection, one consistent grade, aspect ratios, crops, `<Picture>` rules (AVIF/WebP, widths, `sizes`, eager + `fetchpriority="high"` only for the LCP image). Note: the JPG fallback `<Picture>` generates can be the full original size (~1 MB); cap it (e.g. `fallbackFormat`/`width`) here. |
| `home-shared-spaces` | New home section (center, belongs to both cottages): pool, decks, fire pit, barbecue, gazebo, pergola, garden, parking. |
| `home-desktop-axis` | Desktop composition left / center / right beyond the hero. |
| `mobile-switch` | The thumb bar exists (Sumac \| WhatsApp \| Misky). Pending: make WhatsApp's prefilled message depend on the current cottage page, and decide whether tapping a cottage on the home page expands its half of the hero instead of navigating. |
| `page-llegada` | Unlisted "Tu llegada" guest page (`noindex`). |
| `naming-cottage-page` | Differentiate the Misky Wayra cottage page from the brand ("La casa Misky Wayra"). |
| `concept-water` | Is there a stream/river nearby? If not, the water theme leans on the pool and the agapanthus. |
| `content-cabanas` | Texts and data are in. To confirm with the family: Sumac beds (assumed 1 king + 4 singles for 6 guests), whether Misky's 5th guest has a bed, the current streaming list (Star+ merged into Disney+, HBO is now Max; the site says "principales plataformas"), whether to show the 40% deposit step, and the name "Misky Wayra 2" vs "Sumac Mayu" on Google/Booking/Airbnb (must match the site). |
| `content-contact` | Address done (in `config.ts`, used in Ubicación with a Maps link). Pending: WhatsApp number, phone, coordinates, Instagram. |
| `content-cerca` | Texts for "Qué hay cerca" in Ubicación y contacto (what it is, distance from the cottages, when to go). |
| `page-galeria` | Build the Galería: photos in `src/assets/galeria/` grouped by space, editorial layout (arch-masked feature photos + smaller ones), PhotoSwipe on tap, captions, lazy loading. |
| `photos-missing` | Section 9 list, hero pair first. |
| `gallery` | Wire PhotoSwipe on the trip's photos (tap → full screen with caption), loaded only on cottage pages. Add an optional `caption` field per photo in the schema. |
| `ux-details` | See section 13 (items 3–8 pending). |
| `seo-code` | Section 8, in code. |
| `seo-google-profile` | Google Business Profile + review system. Can start now. |
| `seo-search-console` | After the domain exists. |
| `deploy` | `.com.ar` domain (NIC Argentina) and hosting; check the host supports Node 26 builds (24 works too). |

---

## 12. The page feels alive

**Intent:** the page should feel like it's living on its own, like the place itself: things move slowly when nobody is looking, and react when we "bother" them. It should feel like a place, not a screensaver.

### Ideas (to evaluate one by one)

**Living on its own (ambient, when the visitor is idle):**
- **Breathing photos:** the hero photos scale very slowly (about 1.00 → 1.04 over 30–40s, back and forth), as if the light were shifting.
- **The place's own clock:** the page shifts with the real time of day in Capilla del Monte (Argentina time). Morning is light, afternoon is warm, dusk leans to violet (`--agapanto`), night goes to `--noche` with a few stars fading in (astrotourism). The visitor arrives and finds the place at the hour it really is. A few lines of JS set a `data-hora` attribute; the CSS does the rest.
- **The two elements move differently:** wind on the Misky side (horizontal drift, a slight sway); water on the Sumac side (slow shimmer, ripples).
- **Clouds or shadows drifting:** soft cloud shadows crossing the cream background, very slow.
- **Real weather (later):** the real wind speed in Capilla del Monte drives the intensity of the wind motion; cloud cover drives the clouds. Free API without a key (Open-Meteo), one request, static fallback if it fails.

**Reacting when bothered (interaction):**
- **The first movement wakes the page:** when the visitor moves the mouse or scrolls after being idle, a gentle "gust" crosses the page (elements sway, then settle).
- **Hovering the Sumac side:** a water ripple. **Hovering the Misky side:** a wind gust. Each side reacts in its own element.
- **The eave is soft clay:** near the cursor, the curve of the `Alero` deforms slightly and returns slowly.
- **Settling back:** after N seconds without interaction, everything returns to its ambient rhythm. The page "goes back to living on its own."

### Rules (non-negotiable)
- **Subtle:** ambient motion must be almost subliminal. If someone notices it on purpose, it's too much.
- **Never in the way:** never block reading, never move text being read, never move the WhatsApp button.
- **Performance:** only `transform` and `opacity`; pause animations off-screen (IntersectionObserver or `animation-play-state`) and when the tab is hidden; CSS first, minimal JS; stay inside the JS budget.
- **`prefers-reduced-motion`:** everything ambient turns off; the page is static and complete.
- **No sound.**
- Belongs to `motion-language`; build after the structure and the photos are final.

---

## 13. UX details (the small things that make it worth it)

Small moments, each tied to the place. Ordered by impact vs effort.

1. **Done — The home half morphs into the cottage page:** click a half of the hero, that photo expands into the cottage hero (view transitions).
2. **Done — Colors cross-fade between pages:** going from the home to a cottage, the theme blends instead of switching abruptly.
3. **Sections enter softly while scrolling:** subtle fade + rise in pure CSS (already used in the trip); the eave dividers could grow from flat to curved as they come into view.
4. **Photo captions with real details:** "La cocina mira al Uritorco", "El adobe se hizo a mano, capa por capa" (only true facts). Turns the gallery into a story.
5. **Warm microcopy in voseo everywhere:** buttons, empty states, WhatsApp messages, errors.
6. **Themed 404 page:** "Te perdiste en el monte", with a way back to the home and to both cottages.
7. **Copy the address with one tap,** with a small "Copiado" confirmation.
8. **A local wink:** at night (with the living-page clock, section 12), a tiny light crosses the sky once, a nod to the Uritorco's UFO lore. Optional.
