# Hotel RossoVino — Sito web

Sito Next.js 15 per il gruppo Hotel RossoVino (Milano + Boutique + Como).

**Obiettivo di business**: portare la quota di prenotazioni dirette dal 30–35% al 50%. Ogni scelta progettuale è valutata contro questo target.

---

## Stack

- **Next.js 15** + **App Router** + **React 19**
- **TypeScript** strict
- **Tailwind CSS v4** (CSS-first config, `@theme` in `app/globals.css`)
- **next/font** (Fraunces + Outfit + JetBrains Mono, self-hosted via Google Fonts)
- **next/image** con AVIF/WebP automatico
- Zero librerie di terze parti per UI: tutto custom su Tailwind

## Avvio in locale

```bash
cd site
npm install
npm run dev
```

Apri http://localhost:3000

Altri comandi:
- `npm run build` — build di produzione
- `npm run start` — serve la build di produzione
- `npm run typecheck` — controllo TypeScript
- `npm run lint` — lint

## Struttura

```
site/
├── app/
│   ├── layout.tsx              Root layout: fonts, metadata globali
│   ├── page.tsx                Homepage (hub + selettore proprietà)
│   ├── globals.css             Tailwind v4 + palette CSS variables
│   ├── milano/page.tsx         Hotel RossoVino Milano** (2 stelle)
│   ├── milano-boutique/page.tsx  Boutique RossoVino Milano
│   ├── como/page.tsx           Hotel RossoVino Como*** (3 stelle)
│   ├── contatti/page.tsx       Contatti unificati
│   ├── sitemap.ts              Sitemap dinamica
│   └── robots.ts               robots.txt
├── components/
│   ├── BookingWidget.tsx       Wrapper Vertical Booking (PLACEHOLDER)
│   ├── Header.tsx              Header con CTA prenota + contatti
│   ├── StickyMobileBar.tsx     Bar mobile sempre visibile
│   ├── PropertyHero.tsx        Hero riusabile per le pagine struttura
│   ├── PropertyPageContent.tsx Composizione di una pagina struttura
│   ├── PropertyCard.tsx        Card proprietà in homepage
│   ├── ValuePropsRow.tsx       3 punti di forza
│   ├── FaqAccordion.tsx        FAQ accordion (client component)
│   ├── ContactBlock.tsx        Box CTA finale a 4 canali
│   ├── Footer.tsx              Footer con contatti per struttura
│   ├── JsonLd.tsx              Wrapper per schema.org markup
│   ├── icons.tsx               Icone SVG inline
│   ├── Container.tsx           Layout helper
│   ├── Button.tsx              Bottone primario / secondario / ghost
│   └── SectionHeading.tsx      Heading + eyebrow riusabile
├── lib/
│   ├── config.ts               Dati strutturati + PLACEHOLDER
│   ├── content.ts              Copy verbatim dal PDF
│   └── seo.ts                  Helper schema.org + metadata
└── public/
    └── images/                 Foto curate per struttura
```

---

## ✅ Cosa è già fatto

- [x] Le tre pagine struttura raggiungibili su URL diretti, complete e indicizzabili
- [x] Homepage con widget booking + dropdown destinazione
- [x] Header e Sticky Mobile Bar con contatti cliccabili (`tel:`, `wa.me`, `mailto:`)
- [x] Vertical Booking widget — **placeholder funzionale** con form HTML che fa GET sul `verticalBooking.bookingUrl` di ogni proprietà
- [x] SEO: metadata, OpenGraph, Twitter, canonical, sitemap, robots
- [x] Schema.org JSON-LD: Organization, WebSite, Hotel + LocalBusiness, FAQPage, BreadcrumbList
- [x] Copy estratto verbatim dal PDF `copy-pagine-rossovino.pdf` (mai parafrasato)
- [x] Palette colori implementata 1:1 dal PDF `hotelrossovino-palette.pdf`
- [x] Differenziazione cromatica per proprietà: Boutique=vinaccia, Milano=sabbia-dark, Como=blu
- [x] Mobile-first, touch target ≥44px, sticky bar con safe-area iOS
- [x] Accessibilità: skip link, semantic HTML, ARIA, focus visible
- [x] Pagina `/contatti` unificata

---

## ⚠️ PLACEHOLDER da compilare prima del go-live

Tutti i valori da sostituire sono in **`lib/config.ts`** e sono prefissati con `__TODO_…__` — basta cercare quella stringa nel codice.

### Per ogni struttura (Boutique / Milano / Como)

| Placeholder | Cosa serve |
|---|---|
| `__TODO_*_PHONE__` | Numero telefono reception |
| `__TODO_*_WHATSAPP__` | Numero WhatsApp dedicato (+formato internazionale, es. `+393331234567`) |
| `__TODO_*_EMAIL__` | Email reception |
| `__TODO_*_STREET__` | Via + numero civico esatto |
| `__TODO_*_CAP__` | CAP |
| `__TODO_*_LAT__` / `__TODO_*_LNG__` | Latitudine / longitudine (decimal degrees, es. `45.4642`) |
| `__TODO_*_ROOMS__` | Numero totale di camere |
| `__TODO_*_CHECKIN__` / `__TODO_*_CHECKOUT__` | Orari (es. `15:00` / `11:00`) |
| `__TODO_*_VB_ID__` | ID hotel Vertical Booking |
| `__TODO_*_VB_URL__` | URL endpoint Vertical Booking per la prenotazione |

### Livello gruppo

| Placeholder | Cosa serve |
|---|---|
| `__TODO_GROUP_PHONE__` | Numero principale del gruppo (usato in homepage e sticky bar quando non si è su una pagina struttura) |
| `__TODO_GROUP_WHATSAPP__` | WhatsApp gruppo |
| `__TODO_GROUP_EMAIL__` | Email gruppo |

### Distanze nel copy

Alcune FAQ e sezioni Posizione contengono il marker `(Distanza esatta da inserire)`. Quando il cliente fornisce le distanze esatte (Duomo, Galleria, Stazione Centrale, Linate, Malpensa, Como Lago, Brunate, A9), sostituire nel testo in `lib/content.ts`.

### Nomi delle camere

Il PDF cita "camere che portano il nome di un vino italiano" ma non elenca i nomi specifici. Quando arriva la lista, aggiungere una sezione "Camere" nelle pagine struttura.

### Foto

Vedi il file separato `../IMAGES_NOTES.md` alla root del progetto.

---

## Vertical Booking — istruzioni per il developer

Il componente `components/BookingWidget.tsx` contiene oggi un **placeholder funzionale**: un form HTML5 con campi standard (destinazione, check-in, check-out, ospiti) che fa GET sull'URL di Vertical Booking configurato per ogni proprietà.

### Quando arriva l'embed reale

Vertical Booking fornisce tipicamente uno di questi due formati:

**A. Iframe**
```tsx
// Sostituire il <form> nel BookingWidget con:
<iframe
  src={`https://booking.verticalbooking.com/?hotel=${PROPERTIES[property].verticalBooking.hotelId}`}
  width="100%"
  height="180"
  frameBorder={0}
  title="Prenota con Vertical Booking"
/>
```

**B. Script JS + container**
```tsx
// In layout.tsx aggiungere lo script:
<Script src="https://www.verticalbooking.com/embed.js" strategy="afterInteractive" />
// In BookingWidget.tsx aggiungere il div:
<div data-vb-hotel={PROPERTIES[property].verticalBooking.hotelId} />
```

**Importante**: mantenere stabile l'interfaccia del componente (`property?: PropertySlug` + `variant?: "hero" | "inline"`). Il resto del sito la usa già — non serve modificare le pagine.

---

## Variabili d'ambiente

Vedi `.env.example`. Copiare in `.env.local` e compilare prima del deploy:

```bash
NEXT_PUBLIC_GA_ID=          # Google Analytics 4 measurement ID
NEXT_PUBLIC_GTM_ID=         # Google Tag Manager (opzionale)
NEXT_PUBLIC_META_PIXEL_ID=  # Meta Pixel (opzionale)
```

L'integrazione dei pixel non è ancora cablata — il cliente deve confermare se vuole tracking server-side, GTM o entrambi.

---

## Deploy su Vercel

```bash
# Una volta sola
npm install -g vercel
vercel link

# Deploy preview
vercel

# Deploy produzione
vercel --prod
```

Settings Vercel da impostare:
- Framework preset: **Next.js** (auto-rilevato)
- Root directory: **`site`**
- Node version: **20.x**
- Environment variables: copiare i valori da `.env.local` nel pannello Vercel

---

## Obiettivi di performance

Da verificare con Lighthouse prima del go-live:

- Performance ≥ 90 (mobile)
- Accessibility ≥ 95
- SEO = 100
- LCP < 2.5s
- INP < 200ms
- CLS < 0.1
- Bundle JS first load < 100KB gzipped

---

## Note di design

- **Brand color (CTA)**: vinaccia `#8B5963` — usato per tutti i bottoni primari e link principali, su tutte le strutture (coerenza brand).
- **Accent secondario per proprietà** (badge, decorazioni): Boutique=vinaccia, Milano=sabbia-dark, Como=blu.
- **Font display**: Fraunces (serif elegante per H1/H2/H3).
- **Font body**: Outfit (sans contemporaneo).
- **Font mono**: JetBrains Mono (overline, telefoni, dati tecnici).
- **Border radius**: 2px (quasi-flat, niente arrotondature eccessive).
