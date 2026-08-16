# Drone Amare — Full Website Content Replan

## Summary

The current site is built as **DRONE AMRE** and has a solid structure with placeholder/generic US-market content (FAA Part 107, California addresses, American phone numbers, US-centric metrics). The goal is to re-align all content to reflect the **Drone Amare** brand identity — a name rooted in "Amare" (love / to love in Italian/Latin), suggesting a romantic, premium, event-first aerial services brand. All text across every section and constant will be updated to reflect this brand persona, richer storytelling, and more emotionally resonant copy.

---

## Current Website Structure Analysis

| Section | Component | Status |
|---|---|---|
| Navbar | `Navbar.tsx` | Logo, nav links, CTA button |
| Hero | `HeroSection.tsx` | Video BG, headline, metrics bar |
| Services | `ServicesSection.tsx` | 7 service cards w/ images |
| Portfolio/Showreel | `ShowreelSection.tsx` | 4 project case study cards |
| Why Us | `WhyUsSection.tsx` | 4 pillar cards |
| How It Works | `HowItWorksSection.tsx` | 4 step process |
| Testimonials | `TestimonialsSection.tsx` | 3 quote cards |
| Contact | `ContactSection.tsx` | Form + contact info |
| Footer | `Footer.tsx` | Logo, links, legal |
| Petal Drop | `DronePetalDrop.tsx` | Animated canvas/SVG decoration |

> **All content is centralized** in `/src/lib/constants.ts` — making it the primary file to update.

---

## Open Questions

> [!IMPORTANT]
> **Where is Drone Amare based?** The current address is fictional (Studio 04, Skyline District, CA). Should this be updated to a real location (Sri Lanka, India, UAE, etc.) or kept fictional?

> [!IMPORTANT]
> **Language/Market**: Should the copy stay in English, or does the owner want a localized feel (e.g. South Asian market context for weddings, pooja ceremonies, temple events)?

> [!NOTE]
> **Metrics**: Current stats are `500+ Events`, `220+ Weddings`, `7 Services`, `100% Safety`. Should these reflect real numbers or remain aspirational placeholders?

---

## Proposed Content Changes

### Section 1 — Site Config & Brand Identity

#### [MODIFY] [`constants.ts`](file:///Users/vimukthi/Projects/My%20Projects/Drone_Web/src/lib/constants.ts) — `SITE_CONFIG`

**Before:**
```
name: "DRONE AMRE"
tagline: "Premier Aerial Experiences & Visual Productions"
email: "inquiries@droneamre.com"
phone: "+1 (800) 480-AMRE"
location: "Studio 04, Skyline District, CA"
hours: "Mon – Sat: 08:00 – 20:00 PST"
```

**After:**
```
name: "DRONE AMARE"
tagline: "Crafted With Love. Delivered From the Sky."
email: "hello@droneamare.com"
phone: "+94 77 123 4567"  (or real number)
location: "Studio 01, Colombo, Sri Lanka"  (or real address)
hours: "Mon – Sat: 08:00 – 20:00 IST"
```

---

### Section 2 — Navbar

#### [MODIFY] [`Navbar.tsx`](file:///Users/vimukthi/Projects/My%20Projects/Drone_Web/src/components/layout/Navbar.tsx)

- Update logo alt text and brand name display
- Nav links stay the same (Services, Portfolio, Why Us, Process, Reviews, Contact)
- CTA button: "Book a Service →" → **"Book Your Moment →"**

---

### Section 3 — Hero Section

#### [MODIFY] `HERO_DATA` in `constants.ts`

| Field | Current | Proposed |
|---|---|---|
| Badge | `PREMIER AERIAL SERVICES // BOOKINGS OPEN 2026` | `DRONE AMARE // AERIAL ARTISTRY FOR LIFE'S FINEST MOMENTS` |
| Title Line 1 | `WE ELEVATE YOUR MOMENTS` | `LOVE TAKES FLIGHT` |
| Title Line 2 | `FROM ABOVE` | `WITH DRONE AMARE` |
| Description | Generic cinema/stadium | "We craft breathtaking aerial memories for weddings, celebrations, and spectacles — where every petal, every frame, and every flight is an act of love." |
| Primary CTA | `Explore Services` | `Explore Our Services` |
| Secondary CTA | `Book Your Date` | `Book Your Moment` |

**Metrics Bar** updates:
| Metric | Current | Proposed |
|---|---|---|
| Value 1 | `500+` Events Executed | `500+` Celebrations Elevated |
| Value 2 | `220+` Weddings Captured | `220+` Love Stories Filmed |
| Value 3 | `7` Specialty Services | `7` Aerial Experiences |
| Value 4 | `100%` Safety Record | `100%` Safety Record ✓ |

**HUD telemetry labels** (in `HeroSection.tsx`):
- `AERIAL FEED // 360° LIVE ORBIT` → keep (technical, premium feel)
- `TELEMETRY: PITCH +0.4° // ALT 120M` → keep

**Spec Row** (bottom of hero):
- `FAA PART 107 LICENSED` → `CERTIFIED AERIAL PROFESSIONALS`
- `8K CINEMA RAW RIGS` → `8K CINEMA RAW RIGS` ✓ (keep)
- `$5M LIABILITY INSURED` → `FULLY INSURED OPERATIONS`

---

### Section 4 — Services Section

#### [MODIFY] `SERVICES` array in `constants.ts`

Section header:
- Tag: `WHAT WE DELIVER` → **`OUR AERIAL EXPERIENCES`**
- H2: `SPECIALIZED AERIAL EXPERIENCES` → **`CRAFTED FROM THE SKY, FOR YOUR STORY`**
- Subtitle: Update to be more brand-warm and Amare-centric

**Individual Service Cards** — refined taglines & descriptions:

| # | Title | Tagline (Current) | Tagline (Proposed) |
|---|---|---|---|
| 01 | Professional Drone Coverage | Cinema-Grade Aerial Cinematography | Every Frame, a Masterpiece From Above |
| 02 | LED Flying Screen | Aerial Visual Displays in the Sky | Your Message, Glowing in the Night Sky |
| 03 | Weddings & Grand Entrances | Timeless Romantic Perspectives | Where Love Meets the Sky |
| 04 | Events & Concert Productions | Massive Crowd & Stadium Coverage | Capturing the Energy of Your Biggest Night |
| 05 | Commercial Ads & Films | Broadcast-Ready High Concept Shoots | Cinematic Precision for Iconic Brands |
| 06 | Flower & Petal Dropping | Sky-High Romantic Celebrations | A Rain of Petals, A Moment Forever |
| 07 | RC Butterflies Fleet | Enchanting Aerial Micro-Performances | Flutter, Glow & Enchant Your Guests |

---

### Section 5 — Portfolio / Showreel

#### [MODIFY] `PORTFOLIO_SHOWCASE` in `constants.ts`

Update project names and locations to be more relatable/global (not US-centric if targeting a different market):

| # | Old Project | Proposed Project |
|---|---|---|
| 1 | The Chateau Grand Wedding, Napa Valley | The Garden of Vows — Sunset Wedding Cascade |
| 2 | Hyperion EV Global Launch, Mojave | Prestige Motors Asia-Pacific Launch |
| 3 | Solstice Night Music Festival, Miami | Aurora Beats International Music Festival |
| 4 | Enchanted Garden Gala, Beverly Hills | Ivory Palace Gala — Butterfly Twilight |

---

### Section 6 — Why Us

#### [MODIFY] `WHY_US_PILLARS` in `constants.ts`

Section header:
- Tag: `OPERATIONAL EXCELLENCE` → **`THE AMARE DIFFERENCE`**
- H2: `ENGINEERED FOR PERFECT FLIGHTS` → **`PRECISION MEETS PASSION`**
- Subtitle: "Every flight we take is a promise to make your moment unforgettable — backed by the finest crew, equipment, and attention to detail."

**Pillar Cards** updates:
| # | Title (Current) | Title (Proposed) |
|---|---|---|
| 01 | FAA-Certified Master Pilots | Expert-Certified Aerial Professionals |
| 02 | Cutting-Edge Fleet & Payloads | Industry-Leading Aerial Fleet |
| 03 | Bespoke Creative Direction | Your Vision, Our Aerial Canvas |
| 04 | Triple Safety Redundancy | Zero-Compromise Safety Standards |

---

### Section 7 — How It Works

#### [MODIFY] `HOW_IT_WORKS_STEPS` in `constants.ts`

Section header:
- Tag: update to `YOUR JOURNEY WITH US`
- H2: update to `FROM VISION TO FLIGHT`

**Step updates:**
| Step | Title (Current) | Title (Proposed) |
|---|---|---|
| 01 | Select & Inquire | Dream & Inquire |
| 02 | Consult & Plan | Plan Your Sky Moment |
| 03 | Flawless Execution | We Take Flight |
| 04 | Master Delivery | Relive Every Moment |

---

### Section 8 — Testimonials

#### [MODIFY] `TESTIMONIALS` in `constants.ts`

- Replace the `AERO // VISION` brand name mention in testimonial #2 with **Drone Amare**
- Update all client event names to match updated portfolio names for consistency

---

### Section 9 — Contact Section

#### [MODIFY] [`ContactSection.tsx`](file:///Users/vimukthi/Projects/My%20Projects/Drone_Web/src/components/sections/ContactSection.tsx)

- Section Tag: `INITIATE A FLIGHT REQUEST` → **`LET'S CREATE SOMETHING BEAUTIFUL`**
- H2: Update to reflect Amare brand
- Phone/Email/Location updated from `constants.ts`
- Form CTA: `SUBMIT FLIGHT REQUEST` → **`SEND MY ENQUIRY`**

---

### Section 10 — Footer

#### [MODIFY] [`Footer.tsx`](file:///Users/vimukthi/Projects/My%20Projects/Drone_Web/src/components/layout/Footer.tsx)

- Update brand name from `DRONE AMRE` → `DRONE AMARE`
- Update tagline / brand description blurb
- Update copyright: `© 2026 DRONE AMRE` → `© 2026 DRONE AMARE`
- Bottom bar: `FAA PART 107 LICENSED // $5M EVENT LIABILITY INSURED` → `CERTIFIED PROFESSIONALS // FULLY INSURED OPERATIONS`

---

## Files to Change

| File | Change Type | Description |
|---|---|---|
| [`constants.ts`](file:///Users/vimukthi/Projects/My%20Projects/Drone_Web/src/lib/constants.ts) | **MODIFY** | Primary content update — all text/data |
| [`HeroSection.tsx`](file:///Users/vimukthi/Projects/My%20Projects/Drone_Web/src/components/sections/HeroSection.tsx) | **MODIFY** | Update HUD labels, spec row text |
| [`ContactSection.tsx`](file:///Users/vimukthi/Projects/My%20Projects/Drone_Web/src/components/sections/ContactSection.tsx) | **MODIFY** | Section labels, form CTA text |
| [`Footer.tsx`](file:///Users/vimukthi/Projects/My%20Projects/Drone_Web/src/components/layout/Footer.tsx) | **MODIFY** | Brand name, tagline, copyright |
| [`HowItWorksSection.tsx`](file:///Users/vimukthi/Projects/My%20Projects/Drone_Web/src/components/sections/HowItWorksSection.tsx) | **MODIFY** | Section header labels |
| [`TestimonialsSection.tsx`](file:///Users/vimukthi/Projects/My%20Projects/Drone_Web/src/components/sections/TestimonialsSection.tsx) | **MODIFY** | Section header labels |
| [`WhyUsSection.tsx`](file:///Users/vimukthi/Projects/My%20Projects/Drone_Web/src/components/sections/WhyUsSection.tsx) | **MODIFY** | Section header labels |
| [`ServicesSection.tsx`](file:///Users/vimukthi/Projects/My%20Projects/Drone_Web/src/components/sections/ServicesSection.tsx) | **MODIFY** | Section header labels |
| [`ShowreelSection.tsx`](file:///Users/vimukthi/Projects/My%20Projects/Drone_Web/src/components/sections/ShowreelSection.tsx) | **MODIFY** | Section header labels |
| [`layout.tsx`](file:///Users/vimukthi/Projects/My%20Projects/Drone_Web/src/app/layout.tsx) | **MODIFY** | Page `<title>` and meta description |

---

## Verification Plan

### Manual Verification
1. Load `http://localhost:3000` and verify all sections display updated Drone Amare content
2. Confirm no references to old brand names remain (grep for "AMRE", "FAA PART 107", "Napa Valley", etc.)
3. Verify the footer copyright, contact info, and nav CTA button all reflect the new brand
4. Check consistency between testimonials and portfolio project names
