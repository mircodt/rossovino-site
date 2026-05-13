# Note sulla gestione delle immagini

## Stato attuale (confermato dal cliente)

- La cartella sorgente `websizephotos/MILANO …` contiene in realtà le foto del **Boutique RossoVino Milano**.
- **Non esistono foto specifiche** per l'**Hotel RossoVino Milano** (2 stelle).
- **Decisione**: le due pagine `/milano-boutique` e `/milano` mostrano **le stesse identiche foto**.

## Mappatura sorgenti → destinazioni

### Boutique RossoVino Milano + Hotel RossoVino Milano**

Le cartelle `public/images/boutique/` e `public/images/milano/` contengono gli **stessi file** (copie identiche). Quando arriveranno foto dedicate al 2-stelle, basterà sostituire i file in `public/images/milano/` senza toccare altro.

| File | Sorgente |
|---|---|
| `hero.jpg` + `og.jpg` | `MILANO/Hotel RossoVino - Milano -004.jpg` |
| `gallery-1.jpg` | `MILANO/Hotel RossoVino - Milano -003.jpg` |
| `gallery-2.jpg` | `MILANO/Hotel RossoVino - Milano -006.jpg` |
| `gallery-3.jpg` | `MILANO/Hotel RossoVino - Milano -008.jpg` |

### Hotel RossoVino Como***

Cartella `public/images/como/`:

| File | Sorgente |
|---|---|
| `hero.jpg` + `og.jpg` | `COMO/HotelRossovino_Como_Dettagli-001.jpg` |
| `gallery-1.jpg` | `COMO/HotelRossovino_Como_Dettagli-005.jpg` |
| `gallery-2.jpg` | `COMO/HotelRossovino_Como_Dettagli-009.jpg` |
| `gallery-3.jpg` | `COMO/HotelRossovino_Como_Dettagli-011.jpg` |

## Inventario foto sorgenti

| Cartella sorgente | Foto | Note |
|---|---|---|
| `MILANO/` | 9 | Boutique — foto generali |
| `MILANO - Stanze/` | 105 | Boutique — camere |
| `MILANO - Esterni_ Spazi comuni e Dettagli/` | 33 | Boutique — esterni e spazi comuni |
| `COMO/` | 11 | Como — dettagli |
| `COMO - Stanze/` | 92 | Como — camere |
| `COMO - Aree Comuni/` | 41 | Como — spazi comuni |
| `COMO - Colazione/` | 24 | Como — sala colazione + terrazze |
| `COMO - Pannelli 3D/` | 9 | Como — pannelli 3D |

In totale ~325 foto **non utilizzate** restano in `websizephotos/`, pronte per:
- una galleria camere (numerose foto disponibili per entrambe le città)
- una sezione "Colazione" per Como (24 foto)
- foto esterne aggiuntive

## Caratteristiche tecniche

- **Risoluzione**: ~2048×1365 px (ratio 3:2)
- **Formato**: JPEG, già web-sized (~150–500 KB per foto)
- **Ottimizzazione**: Next.js rielabora automaticamente in AVIF/WebP a runtime via `next/image` — nessun preprocessing necessario
- **Alt-text**: scritti dinamicamente in base a `PROPERTIES[slug].fullName`. Se servono alt più descrittivi per SEO, sostituire negli `<Image>` dei componenti.

## TODO (prima del go-live)

- [ ] **Decisione UX**: visitando `/milano-boutique` e poi `/milano` l'ospite vede le stesse foto. Valutare se aggiungere almeno una "variazione cromatica" (overlay diverso) o un layout diverso per non rendere troppo evidente la duplicazione, oppure procurare foto dedicate al 2-stelle.
- [ ] Cliente: fornire foto dello **stemma in mosaico Biffi** (citato espressamente nel copy del Boutique).
- [ ] Valutare se aggiungere una sezione "Le camere" con galleria (le foto sono già disponibili in `MILANO - Stanze/` e `COMO - Stanze/`).
- [ ] Per Como: valutare se aggiungere una sezione "Colazione sulle terrazze" con foto dedicate (24 disponibili).
