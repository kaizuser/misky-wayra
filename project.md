# Misky Wayra — project memory

Single source of truth for this project: what we decided, why, what exists, and what's next.
Paste this file at the start of a new conversation to resume work.

---

## Milestones

### v0.1 — Balance point (October 11, 2026)
The project reached stability: the concept, the design system and the main structure are agreed and working. From here on the work is **polishing what exists**, not redefining it.

**Agreed and built at this point:** the axis concept (Sumac left, the complex at the center, Misky right); palette v2 and the role/theme system; Fraunces + Figtree; full-bleed layout with `.banda`; the `Alero` eave divider; hero B1 (two houses, eave edges, hover growth); the functional nav with the temporary emblem, the off-axis menu and the mobile thumb bar; the page sketches; this file.

**Rule from here:** the **structure is fixed**: pages, sections and their order, the left / center / right axis, components and what each one does. **Redesigns are welcome**: shape, look and feel of any piece can change (e.g. a new shape for the nav, same functionality). If the structure itself ever needs to change, discuss it first and record why in section 10.

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
- Practical pages (Alrededores, Ubicación y contacto) live **off the axis**, at the side.
- Symmetry carries the layout; motion carries the life (pure symmetry alone feels static).

**The shape language comes from Sumac's façade:**
- **The eave (alero):** thick organic curve, highest at the center, drooping at the ends. Used as the section divider.
- **The arch:** the glazed window under the eave. Its central mullion is literally the site's axis.
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

**Rejected:** Next.js (overkill), Vue/Angular (no benefit), React for now (no component state needed), Tailwind/Sass, GSAP v1, embedded Google Maps iframe (heavy; use a link that opens the Maps app), standalone gallery page (photos sell better in context), online check-in (needs backend + personal data handling).

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
│   └── hero-misky.jpg    IMG_0416 (original file, temporary until the hero pair is reshot)
├── components/
│   ├── Alero.astro     eave divider; props fill, flip, cap (cap fills the area ABOVE the curve)
│   ├── Emblema.astro   temporary emblem (Sumac with dome), full color, variante completo|compacto, unique gradient IDs per instance
│   ├── Hero.astro      hero B1: title on cream + two-photo band with eave edges
│   └── Nav.astro       functional nav: sticky eave bar + emblem dome, utility links off-axis (popover on small screens), mobile thumb bar
public/favicon.svg      compact emblem, square viewBox
├── layouts/Base.astro  <html>/<head>, fonts, CSS imports, header, footer, data-theme on <body>
├── pages/
│   ├── index.astro
│   ├── alrededores.astro
│   ├── ubicacion-y-contacto.astro
│   └── cabanas/
│       ├── sumac-mayu.astro    theme="mayu"
│       └── misky-wayra.astro   theme="wayra"
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
- **Concept:** the nav is the eave over the hero's window: Sumac Mayu on the left wing, Misky Wayra on the right wing, the emblem in the center as the dome (it overflows the bar). Utility links (Alrededores, Ubicación y contacto) live off the axis, at the right edge.
- **States:** at the top of the page it's open (transparent, larger emblem); while scrolling it condenses into a floating sticky pill (cream, blur, soft shadow). Done with a CSS scroll-driven animation (`animation-timeline: scroll(root)`); browsers without support (Firefox) always show the floating pill.
- **Current page:** `aria-current="page"` computed from `Astro.url.pathname`; the active wing is underlined.
- **Utility links:** one `<nav popover>`: visible as small links on desktop (≥ 64rem, author CSS overrides the UA popover styles); behind a round menu button below 64rem (native popover: light dismiss, Esc, no JS).
- **Mobile (< 40rem):** top shows only the emblem; a fixed thumb bar at the bottom: Sumac Mayu | WhatsApp in a raised circle (the dome, `--color-primary`) | Misky Wayra. `body` gets bottom padding so the bar never hides content. WhatsApp icon is a generic chat bubble (don't reproduce the WhatsApp logo).
- **Nav ↔ hero:** hovering a cottage name in the nav grows that half of the hero (`:global(body:has(...))` in `Hero.astro`).

### Emblem (temporary, `Emblema.astro`)
- From the developer's `Frame.svg`: Sumac's body in a terracotta gradient, the dome with three small arched windows, the dark green arched window with cream mullions (center one = the axis), ground, two plants. Cropped viewBox `94 118 312 222`.
- Full color (not `currentColor`): it's an illustration, it doesn't take theme colors.
- `variante="compacto"` drops the plants and the fine lines; the favicon uses that version.

### Pages (sketches with placeholders in brackets)
- **index:** `<Hero />` → El complejo (`.banda`) → `<Alero flip />` → Nuestras cabañas (two themed cards, Sumac left / Misky right) → mirrored comparison table (attribute in the center column) → Alrededores teaser → `<Alero />` → Contacto (`.banda`).
- **cabanas/*:** hero photo, La esencia, Detalles (`<dl>` mirrored: labels right-aligned, values left-aligned), Comodidades, Fotos, WhatsApp button with prefilled message per cottage, `<aside>` "Conocé también" linking the sibling cottage. The two files are near-identical on purpose; they'll merge into `[slug].astro`.
- **alrededores:** Cerro Uritorco, Los Terrones, Ongamira, El pueblo, El cielo de noche.
- **ubicacion-y-contacto:** address, static map + "Abrir en Google Maps" link, how to get there, WhatsApp / phone / Instagram.

**WhatsApp format:** `https://wa.me/549` + area code without 0 + number without 15, `?text=` + `encodeURIComponent(...)`. Phone: `tel:+549...`.

---

## 5. Design system

### Palette v2 (taken from the real place, saturation toned down)

| Group | Token | Hex | Source |
|---|---|---|---|
| Complex (center) | `--cal` | `#F4ECDF` | Misky's lime plaster. Page background everywhere. |
| | `--arena` | `#E4D5BC` | |
| | `--monte` | `#5B6130` | Olive of the monte |
| | `--uritorco` | `#615D3A` | Khaki of the mountain |
| | `--tinta` | `#2B2119` | Text (warm dark brown, never black) |
| Sumac Mayu (left) | `--teja-clara` | `#F1D2B6` | |
| | `--adobe` | `#9C4219` | Terracotta adobe |
| | `--agapanto` | `#4B4D9E` | Agapanthus blue-violet (its water accent) |
| | `--brasa` | `#4A1E0E` | |
| Misky Wayra (right) | `--cielo` | `#CFE0EC` | |
| | `--techo` | `#2B6A4E` | Green roof |
| | `--viento` | `#2D5F8A` | Sierra sky blue |
| | `--noche` | `#1E2140` | |

**Roles** (components only use roles, never raw colors): `--color-bg`, `--color-text`, `--color-surface`, `--color-primary`, `--color-accent`, `--color-deep`, `--color-on-color`.

| Role | Default (`tierra`, the complex) | `mayu` | `wayra` |
|---|---|---|---|
| bg | cal | cal | cal |
| text | tinta | tinta | tinta |
| surface | arena | teja-clara | cielo |
| primary | monte | adobe | techo |
| accent | uritorco | agapanto | viento |
| deep | tinta | brasa | noche |
| on-color | cal | cal | cal |

`data-theme` works on any element (custom properties inherit): `<body>` on cottage pages, cards on the home page, nav links.

**Contrast guarantee (verified):** every primary and accent ≥ 4.5:1 on `cal` and on its own side's surface; text on every surface > 10:1.

**Color protocol:** components use roles only; ~60% surface / 30% theme / 10% accent; 4.5:1 for text, 3:1 for large text/UI; the WhatsApp button uses `--color-primary`, never WhatsApp green; the home center is always the complex theme.

### Typography
- **Fraunces** (headings): soft, slightly irregular variable serif, feels handmade like the house. Used large, light weights. (Its SOFT axis isn't configured; the standard Fonts API setup loads weights 300–700.)
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

- **Pages:** `/`, `/cabanas/sumac-mayu`, `/cabanas/misky-wayra`, `/alrededores`, `/ubicacion-y-contacto`, plus unlisted `/tu-llegada` (guest info sent via WhatsApp after confirming: check-in/out times, exact directions, what to bring, rules, local tips).
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
- Use **originals** in `src/assets/...` (never WhatsApp-compressed copies; send them as documents or via Drive). Astro generates AVIF/WebP sizes.
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
| IMG_0416 | Misky round house, green roof, Uritorco and sierras behind; shot from Sumac's roof; water tank tower, car, hose | **Hero, Misky half (temporary).** Weak: higher viewpoint than Sumac's photo, distractions. |
| IMG_0436 | Misky from above with tank tower and car | Backup only |
| IMG_0439 | Misky + Uritorco + Sumac's orange roof in the foreground + pool deck | Shared spaces / Misky page |
| IMG_0431 | Uritorco centered, large sky, garden, people on the deck in a corner | **Alrededores hero** or shared spaces (was the first hero, rejected as too minimal) |
| IMG_0451, 0449, 0446, 0444, 0443, 0441, 0433 | Pool, decks, fire pit and garden from Sumac's roof, Uritorco behind (~6 near-identical) | Pick 1–2 for shared spaces (IMG_0433 most pool-centered, IMG_0451 widest with the mountain) |
| IMG_0435 | Garden, olive tree, gazebo, barbecue, Sumac roof edge, distant sierras | Shared spaces |
| IMG_0392 | Metal arched pergola with grapevine | Shared spaces (another arch) |
| IMG_0390 | Jasmine-covered wrought-iron gazebo with chairs, Sumac behind | Shared spaces |
| IMG_0370 | Agapanthus in the foreground, pool, a person, Misky behind | Shared spaces; source of the `agapanto` color |

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
- **Hero option B2** (photos fill the first screen, title on a plaque over the seam) — B1 was preferred.
- **Title over the sky** — white clouds behind the title kill contrast; a dark scrim would spoil the sky. Title goes on the cream background (or on a cream plaque).
- **Gradient blend between the two hero photos** — different skies/horizons would create a muddy middle; use a clean cut (the mullion) instead.

---

## 11. Backlog

### Done
| Name | Notes |
|---|---|
| `nav-functional` | `Nav.astro` + `Emblema.astro` + favicon. |
| `identity-buildings` | Sumac = orange adobe house (left), Misky = round green-roof house (right), complex = Misky Wayra. |
| `palette-v2` | Section 5. |
| `type-final` | Fraunces + Figtree via Fonts API. |
| `layout-full-bleed` | Full-width sections, content on the axis, `.banda`. |
| `shape-eave` | `Alero.astro`, pronounced, `--alero-alto` token. |

### In progress
| Name | Status |
|---|---|
| `home-hero` | **Option B1 chosen and built.** Title + phrase on cream; below, a full-bleed band with Sumac (left) and Misky (right), separated by a 6px cream gap (the mullion, `--parante`). Top edge: `<Alero cap>` in the page color, so the photos rise toward the center like the eave. Bottom edge: `<Alero>` in arena, flowing into El complejo. Each half is a link to its cottage with a cream pill label in its theme color. Mobile: stacked (Sumac above, Misky below), 4:3 each. Tablet/desktop: side by side, height `clamp(24rem, 70svh, 48rem)`. Desktop with mouse: hovered side grows to 1.3fr (animated `grid-template-columns`). Pending: final phrase, photo grade, reshoot of the pair, crops tuning, link to `mobile-switch`, view transition to the cottage page. Option B2 (photos fill the first screen + title on a cream plaque on the seam) was the alternative. |
| `emblem-arch` | **Temporary emblem in use** (developer's `Frame.svg`, see Emblem). The definitive emblem is still open: more expressive, low noise; maybe a designer. When it changes, only `Emblema.astro` and `public/favicon.svg` change. |

### Unaddressed
| Name | Description |
|---|---|
| `nav-design` | The functional nav is built (see Nav). Pending: a **differential design of its own** for the nav, not just a pill: its own shape and personality from the place (ideas: the bar's silhouette as the real roofline with the dome rising at the center; the wings as the eave; the menu opening like an arch). Developer expects this to come up later. |
| `shape-arch-mask` | The arch as a mask/frame for photos (cottage pages, galleries). Not for the home hero anymore. |
| `texture-adobe` | Subtle grain/texture from the adobe plaster for backgrounds. |
| `pattern-path` | Subtle pattern from the garden paths (green cement + pink stones) and the stone base. |
| `motion-language` | One orchestrated load moment; water motion (flowing) vs wind motion (drifting); durations, easing; reduced motion. CSS first. |
| `image-system` | Photo selection, one consistent grade, aspect ratios, crops, `<Picture>` rules (AVIF/WebP, widths, `sizes`, eager + `fetchpriority="high"` only for the LCP image). |
| `home-shared-spaces` | New home section (center, belongs to both cottages): pool, decks, fire pit, barbecue, gazebo, pergola, garden, parking. |
| `home-desktop-axis` | Desktop composition left / center / right beyond the hero. |
| `mobile-switch` | The thumb bar exists (Sumac \| WhatsApp \| Misky). Pending: make WhatsApp's prefilled message depend on the current cottage page, and decide whether tapping a cottage on the home page expands its half of the hero instead of navigating. |
| `cabana-collection` | Content collection with Zod schema (name, SEO title ≤ 60, description ≤ 160, capacity, rooms, beds, amenities, photos with required alt) and merge both cottage pages into `cabanas/[slug].astro`. |
| `page-llegada` | Unlisted "Tu llegada" guest page (`noindex`). |
| `naming-cottage-page` | Differentiate the Misky Wayra cottage page from the brand ("La casa Misky Wayra"). |
| `concept-water` | Is there a stream/river nearby? If not, the water theme leans on the pool and the agapanthus. |
| `content-cabanas` | Capacity, rooms, beds, amenities and an essence text per cottage. |
| `content-contact` | WhatsApp number, phone, address, coordinates, Instagram. |
| `content-alrededores` | Texts (distance, what it is, when to go) and photos for each place. |
| `photos-missing` | Section 9 list, hero pair first. |
| `gallery` | Wire PhotoSwipe on cottage pages, loaded only there. |
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
