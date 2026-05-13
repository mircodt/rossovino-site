/**
 * All page copy — extracted verbatim from copy-pagine-rossovino.pdf v1.0
 * (06.05.2026). DO NOT paraphrase. If the client requests changes, update
 * here and only here.
 */

import type { PropertySlug } from "./config";

export interface PropertyContent {
  /** SEO / Google snippet */
  meta: {
    title: string;
    description: string;
  };
  /** Hero block */
  hero: {
    h1: string;
    subtitle: string;
  };
  /** Three value props directly under the hero */
  valueProps: { title: string; body: string }[];
  /** Body — alternating H2/H3 with paragraph text */
  presentation: {
    h2: string;
    intro: string[];
    sections: { h3: string; body: string }[];
  };
  /** Room comforts */
  rooms: {
    intro: string;
    comforts: string[];
  };
  /** Services */
  services: string[];
  /** Position description */
  position: {
    h2: string;
    paragraphs: string[];
  };
  /** Sustainability */
  sustainability: {
    intro: string;
    groups: { title: string; items: string[] }[];
  };
  /** Final CTA */
  ctaFinal: {
    title: string;
    body: string;
  };
  /** FAQ — Q&A pairs */
  faq: { q: string; a: string }[];
}

export const CONTENT: Record<PropertySlug, PropertyContent> = {
  "milano-boutique": {
    meta: {
      title: "Boutique Hotel Milano · RossoVino — Villa Storica, Anima del Vino",
      description:
        "Boutique hotel a Milano in una villa di fine '800 della famiglia Biffi. Camere ispirate ai vini italiani, accoglienza autentica, parcheggio gratuito.",
    },
    hero: {
      h1: "Boutique Hotel a Milano, ispirato al mondo del vino italiano",
      subtitle:
        "Una storica villa di fine Ottocento, design contemporaneo e accoglienza autentica nel cuore della città. Senza l'anonimato dei grandi hotel urbani.",
    },
    valueProps: [
      {
        title: "Villa storica del 1880",
        body: "Già residenza della famiglia Biffi, una delle più importanti di Milano",
      },
      {
        title: "Camere come grandi vini",
        body: "Ogni camera porta il nome di un vino italiano d'autore",
      },
      {
        title: "Parcheggio privato gratuito",
        body: "Un valore raro nel centro di Milano, incluso per i nostri ospiti",
      },
    ],
    presentation: {
      h2: "Una villa Biffi reinterpretata con l'anima del vino",
      intro: [
        "Boutique RossoVino Milano nasce dall'idea di reinterpretare l'ospitalità milanese attraverso il mondo del vino. Un ambiente contemporaneo, accogliente, ricco di personalità — lontano dall'anonimato dei grandi hotel urbani.",
        "La struttura occupa una storica villetta di fine Ottocento appartenuta alla famiglia Biffi, tra le più importanti della Milano dell'epoca. All'ingresso è ancora visibile l'originale stemma di famiglia in mosaico, conservato intatto nel tempo: un dettaglio autentico che racconta più di cent'anni di storia milanese.",
        "Storia, design e ospitalità contemporanea convivono in un'unica identità riconoscibile.",
      ],
      sections: [
        {
          h3: "Spazi che raccontano il vino",
          body: "Ogni ambiente richiama il mondo enologico italiano: tonalità calde, dettagli ispirati alle wine house, quadri e materiali pensati per trasmettere convivialità ed eleganza rilassata. Niente formalità inutili. Tutto è studiato per farti sentire a casa, in una casa con personalità.",
        },
        {
          h3: "Camere ispirate ai grandi vini italiani",
          body: "Le nostre camere non sono numeri impersonali: ogni stanza porta il nome di un vino italiano. Un dettaglio che rende ogni soggiorno più memorabile, più tuo.",
        },
        {
          h3: "Un brindisi al tuo arrivo",
          body: "Quando arrivi, ti accogliamo con un calice di benvenuto — il primo passo dell'esperienza RossoVino. In hotel trovi anche una selezione di vini italiani da degustare sul posto o portare a casa.",
        },
        {
          h3: "Una Milano vera, raccontata da chi la vive",
          body: "Quello che ci rende davvero diversi è l'ospitalità. Il nostro staff vive Milano ogni giorno: ama condividere consigli reali, ristoranti scoperti per caso, cocktail bar di quartiere, angoli meno turistici. Ti aiutiamo a vedere la città come la vede un milanese, non come la vede una guida turistica.",
        },
      ],
    },
    rooms: {
      intro:
        "Pensate per il comfort contemporaneo, con un design che si ispira al mondo del vino. Ogni dettaglio è scelto per rendere il soggiorno semplice, fluido e piacevole.",
      comforts: [
        "Aria condizionata",
        "Wi-Fi gratuito ad alta velocità",
        "Smart TV",
        "Frigobar",
        "Sistema automatizzato per accesso camera e gestione clima (check-in fluido anche fuori orario)",
        "Camere non fumatori",
        "Design contemporaneo, materiali curati",
      ],
    },
    services: [
      "Parcheggio privato gratuito (raro nel centro di Milano)",
      "Wi-Fi gratuito in tutta la struttura",
      "Terrazze esterne e spazi relax",
      "Bar con drink italiani e selezione di vini in vendita",
      "Deposito bagagli gratuito",
      "Servizio di pulizia giornaliero",
      "Pet friendly — i tuoi animali sono benvenuti",
      "Videosorveglianza nelle aree comuni",
      "Staff multilingua: italiano, inglese, tedesco, francese, spagnolo",
    ],
    position: {
      h2: "Vicino al cuore di Milano. Lontano dal suo caos.",
      paragraphs: [
        "Boutique RossoVino Milano si trova in una posizione che permette di raggiungere facilmente il centro storico, il Duomo, il Quadrilatero della Moda e le principali zone del design milanese — mantenendo allo stesso tempo un'atmosfera tranquilla, lontana dalla confusione del centro più turistico.",
      ],
    },
    sustainability: {
      intro:
        "Per noi sostenibilità significa fare scelte concrete ogni giorno, senza rinunciare al comfort dei nostri ospiti.",
      groups: [
        {
          title: "Energia",
          items: [
            "Illuminazione LED a basso consumo in tutta la struttura",
            "Sensori di presenza nelle aree comuni",
            "Climatizzazione intelligente",
            "Monitoraggio costante dei consumi energetici",
          ],
        },
        {
          title: "Plastica e prodotti",
          items: [
            "Dispenser ricaricabili per shampoo e saponi",
            "Forte riduzione delle bottiglie in plastica monouso",
            "Detergenti selezionati a basso impatto ambientale",
          ],
        },
        {
          title: "Acqua, lavanderia, rifiuti",
          items: [
            "Cambio asciugamani e lenzuola ottimizzato (su richiesta)",
            "Riduzione degli sprechi nella lavanderia",
            "Raccolta differenziata in tutta la struttura",
          ],
        },
      ],
    },
    ctaFinal: {
      title: "Pronto a vivere Milano con noi?",
      body: "Verifica la disponibilità in tempo reale, oppure contattaci direttamente — siamo a un click di distanza.",
    },
    faq: [
      {
        q: "Boutique RossoVino Milano è un hotel di che categoria?",
        a: "È un boutique hotel di carattere, ricavato da una storica villa di fine Ottocento. Offriamo un'esperienza più personale e contemporanea rispetto al classico hotel urbano, con un'identità ispirata al mondo del vino italiano.",
      },
      {
        q: "C'è il parcheggio?",
        a: "Sì, parcheggio privato gratuito per i nostri ospiti. È un servizio raro nel centro di Milano e per noi rappresenta un valore aggiunto importante.",
      },
      {
        q: "Accettate animali domestici?",
        a: "Sì, siamo pet friendly. I tuoi animali sono benvenuti.",
      },
      {
        q: "Le camere hanno l'aria condizionata e il Wi-Fi?",
        a: "Sì, tutte le camere sono dotate di aria condizionata, Wi-Fi gratuito ad alta velocità, Smart TV e frigobar.",
      },
      {
        q: "Si parlano lingue straniere alla reception?",
        a: "Il nostro staff parla italiano, inglese, tedesco, francese e spagnolo.",
      },
      {
        q: "Posso acquistare vini in hotel?",
        a: "Sì, abbiamo una selezione di vini italiani disponibili in struttura, da gustare sul posto o portare a casa.",
      },
      {
        q: "Cosa rende speciale Boutique RossoVino Milano rispetto agli altri hotel di Milano?",
        a: "Tre cose: la cornice di una villa storica della famiglia Biffi del 1880, un'identità unica ispirata al mondo del vino italiano (camere con i nomi dei grandi vini, calice di benvenuto, selezione enologica), e un'ospitalità autentica fatta di consigli reali per scoprire la Milano dei milanesi.",
      },
    ],
  },

  milano: {
    meta: {
      title: "Hotel a Milano Centro · RossoVino — Posizione Strategica nel Cuore della Città",
      description:
        "Hotel a Milano nel cuore della città, con un'ospitalità italiana ispirata al mondo del vino. Posizione strategica, parcheggio gratuito, camere con il nome dei grandi vini italiani.",
    },
    hero: {
      h1: "Hotel a Milano nel cuore della città, con l'anima del vino italiano",
      subtitle:
        "Una posizione strategica, un'ospitalità italiana riconoscibile e camere che portano il nome dei grandi vini d'Italia. Il punto di partenza giusto per vivere Milano.",
    },
    valueProps: [
      {
        title: "Posizione strategica",
        body: "Nel cuore di Milano, vicino a Duomo, moda e collegamenti principali",
      },
      {
        title: "Camere come grandi vini",
        body: "Ogni camera porta il nome di un vino italiano d'autore",
      },
      {
        title: "Parcheggio privato gratuito",
        body: "Un valore raro nel centro di Milano, incluso per i nostri ospiti",
      },
    ],
    presentation: {
      h2: "Un hotel a Milano con un carattere riconoscibile",
      intro: [
        "Hotel RossoVino Milano è il punto di partenza ideale per scoprire la città. Un hotel pensato per chi vuole dormire in posizione strategica, in un ambiente caldo e personale — lontano dall'anonimato dei grandi alberghi urbani.",
        "L'ospitalità italiana qui incontra il mondo del vino, l'identità che attraversa tutte le strutture RossoVino. Il risultato è un hotel a Milano dal carattere preciso: contemporaneo nello stile, autentico nello spirito, accessibile nella sostanza.",
      ],
      sections: [
        {
          h3: "Spazi che raccontano il vino italiano",
          body: "Ogni ambiente richiama il mondo enologico: tonalità calde, dettagli ispirati alle wine house, materiali curati e atmosfere che trasmettono convivialità ed eleganza rilassata. Niente formalità inutili, niente design impersonale. Tutto è studiato per farti sentire a casa, ma in una casa con personalità.",
        },
        {
          h3: "Camere ispirate ai grandi vini italiani",
          body: "Le nostre camere non sono numeri impersonali: ogni stanza porta il nome di un vino italiano. È un dettaglio che rende ogni soggiorno più memorabile e ti accompagna fin dall'arrivo dentro l'identità RossoVino.",
        },
        {
          h3: "Un brindisi di benvenuto",
          body: "Quando arrivi, ti accogliamo con un calice di benvenuto — il primo gesto dell'esperienza RossoVino. In hotel trovi anche una selezione di vini italiani da assaggiare sul posto o portare con te.",
        },
        {
          h3: "Una Milano vera, raccontata da chi la vive",
          body: "Quello che davvero ci distingue è l'ospitalità. Il nostro staff vive Milano ogni giorno: ama condividere consigli reali, ristoranti scoperti per caso, cocktail bar di quartiere, angoli meno turistici. Ti aiutiamo a vedere la città come la vede un milanese, non come la disegna una guida.",
        },
      ],
    },
    rooms: {
      intro:
        "Pensate per il comfort contemporaneo, con un design che si ispira al mondo del vino italiano. Ogni dettaglio è scelto per rendere il soggiorno semplice, fluido e piacevole.",
      comforts: [
        "Aria condizionata",
        "Wi-Fi gratuito ad alta velocità",
        "Smart TV",
        "Frigobar",
        "Sistema automatizzato per accesso camera e gestione clima",
        "Camere non fumatori",
        "Materiali e finiture curate",
      ],
    },
    services: [
      "Parcheggio privato gratuito (raro nel centro di Milano)",
      "Wi-Fi gratuito in tutta la struttura",
      "Spazi relax e aree comuni curate",
      "Bar con drink italiani e vini in vendita",
      "Deposito bagagli gratuito",
      "Pulizia giornaliera",
      "Pet friendly — i tuoi animali sono benvenuti",
      "Videosorveglianza nelle aree comuni",
      "Staff multilingua: italiano, inglese, tedesco, francese, spagnolo",
    ],
    position: {
      h2: "Una posizione strategica per vivere Milano",
      paragraphs: [
        "Hotel RossoVino Milano si trova in una posizione che ti permette di muoverti facilmente in tutta la città: il Duomo, la Galleria, il Quadrilatero della Moda e i quartieri del design sono raggiungibili rapidamente, così come le principali stazioni e i collegamenti per gli aeroporti.",
        "Una base perfetta per chi visita Milano per turismo, business, fiere o brevi soggiorni — e vuole massimizzare il tempo in città senza preoccuparsi degli spostamenti.",
      ],
    },
    sustainability: {
      intro:
        "Per noi sostenibilità significa fare scelte concrete senza rinunciare al comfort dei nostri ospiti. Lo facciamo tutti i giorni, in tutte le strutture RossoVino.",
      groups: [
        {
          title: "Energia",
          items: [
            "Illuminazione LED a basso consumo",
            "Sensori di presenza nelle aree comuni",
            "Climatizzazione intelligente",
            "Monitoraggio costante dei consumi",
          ],
        },
        {
          title: "Plastica e prodotti",
          items: [
            "Dispenser ricaricabili per shampoo e saponi",
            "Forte riduzione delle bottiglie monouso",
            "Detergenti selezionati a basso impatto",
          ],
        },
        {
          title: "Acqua, lavanderia, rifiuti",
          items: [
            "Cambio asciugamani e lenzuola ottimizzato (su richiesta)",
            "Riduzione degli sprechi nella lavanderia",
            "Raccolta differenziata in tutta la struttura",
          ],
        },
      ],
    },
    ctaFinal: {
      title: "Pronto a vivere Milano con noi?",
      body: "Verifica la disponibilità in tempo reale, oppure contattaci direttamente — siamo a un click di distanza.",
    },
    faq: [
      {
        q: "Hotel RossoVino Milano è un hotel di che categoria?",
        a: "È un hotel 2 stelle nel cuore di Milano, con un'identità di brand precisa ispirata al mondo del vino italiano. Un'esperienza più calda e riconoscibile rispetto a un classico hotel di stessa categoria.",
      },
      {
        q: "Qual è la differenza tra Hotel RossoVino Milano e Boutique RossoVino Milano?",
        a: "Sono due strutture distinte dello stesso gruppo. Hotel Milano è un 2 stelle in posizione centrale, perfetto per chi cerca un soggiorno strategico e accessibile. Boutique Milano è una struttura più premium, ricavata da una villa storica della famiglia Biffi, pensata per soggiorni più aspirazionali. Stesso brand, due esperienze diverse.",
      },
      {
        q: "C'è il parcheggio in hotel?",
        a: "Sì, parcheggio privato gratuito per i nostri ospiti — un servizio raro nel centro di Milano e per noi un valore aggiunto importante.",
      },
      {
        q: "Accettate animali domestici?",
        a: "Sì, siamo pet friendly. I tuoi animali sono benvenuti.",
      },
      {
        q: "Il check-in è automatizzato? Posso arrivare tardi?",
        a: "La struttura dispone di un sistema automatizzato per l'accesso alle camere. (Da confermare orari di check-in flessibile o late check-in.)",
      },
      {
        q: "Si parlano lingue straniere alla reception?",
        a: "Il nostro staff parla italiano, inglese, tedesco, francese e spagnolo.",
      },
      {
        q: "Le camere hanno l'aria condizionata e il Wi-Fi?",
        a: "Sì, tutte le camere sono dotate di aria condizionata, Wi-Fi gratuito ad alta velocità, Smart TV e frigobar.",
      },
      {
        q: "Posso acquistare vini in hotel?",
        a: "Sì, abbiamo una selezione di vini italiani disponibili in struttura, da gustare sul posto o portare a casa.",
      },
    ],
  },

  como: {
    meta: {
      title: "Hotel a Como nel Verde · RossoVino — Sul Lago, vicino al Centro",
      description:
        "Hotel a Como immerso in un'area verde, vicino alla Basilica di Sant'Abbondio. Camere ispirate ai grandi vini italiani, parcheggio gratuito e bus per il centro davanti all'hotel.",
    },
    hero: {
      h1: "Hotel sul Lago di Como, tra vino, natura e ospitalità autentica",
      subtitle:
        "Un hotel immerso nel verde, ispirato al mondo del vino italiano. Per chi cerca un modo più autentico e contemporaneo di vivere Como, lontano dal turismo standard.",
    },
    valueProps: [
      {
        title: "Immersi nel verde",
        body: "Vicino a Villa Giovio, in un'area classificata verde dal Comune di Como",
      },
      {
        title: "Camere come grandi vini",
        body: "Ogni camera porta il nome di un vino italiano d'autore",
      },
      {
        title: "Colazione sulle terrazze",
        body: "Servita all'aperto, tra natura e vista sulle montagne comasche",
      },
    ],
    presentation: {
      h2: "Un altro modo di vivere il Lago di Como",
      intro: [
        "Hotel RossoVino Como nasce dall'idea di creare un luogo accogliente e autentico, diverso dal classico hotel sul Lago di Como. Un posto pensato per chi cerca pace, natura e un'ospitalità con un carattere riconoscibile, lontano dal turismo di massa che spesso accompagna la zona.",
        "L'hotel è immerso in una delle aree più verdi della città, tra natura, tranquillità e scorci che uniscono il lago alle montagne comasche. L'atmosfera è rilassata, curata, contemporanea — il calore dell'ospitalità italiana incontra il mondo del vino.",
      ],
      sections: [
        {
          h3: "Spazi che raccontano il vino italiano",
          body: "Ogni ambiente richiama questa identità: tonalità calde, dettagli ispirati alle wine house italiane, materiali curati e spazi pensati per trasmettere convivialità ed eleganza rilassata. È un design che parla, ma a voce bassa.",
        },
        {
          h3: "Camere ispirate ai grandi vini italiani",
          body: "Le nostre camere non sono numeri impersonali: ogni stanza porta il nome di un vino italiano. Un dettaglio che rende il soggiorno più tuo e ti accompagna fin dall'arrivo dentro l'identità RossoVino.",
        },
        {
          h3: "Un brindisi al tuo arrivo",
          body: "Quando arrivi, ti accogliamo con un calice di benvenuto — il primo gesto dell'esperienza RossoVino. In hotel trovi anche una selezione di vini italiani da assaggiare sul posto o portare a casa, come ricordo concreto del soggiorno.",
        },
        {
          h3: "Una Como vera, raccontata da chi la vive",
          body: "Il nostro staff è composto da persone del territorio, profondamente legate a Como e alla sua cultura. Ogni consiglio nasce da esperienze vissute davvero: ristoranti autentici, passeggiate nella natura, luoghi nascosti, angoli della città che non si trovano semplicemente cercando online. Qui vogliamo che gli ospiti si sentano accolti davvero — non gestiti, ma accompagnati.",
        },
        {
          h3: "Un'area verde, a un passo dalla città",
          body: "L'hotel confina con il verde di Villa Giovio ed è situato a pochi passi dalla storica Basilica di Sant'Abbondio, in una zona classificata dal Comune di Como come area verde. Una posizione ideale per chi desidera soggiornare lontano dal caos del centro turistico, restando comodamente collegato alla città. Proprio di fronte all'hotel si trova la fermata dell'autobus che porta direttamente al centro: i nostri ospiti possono lasciare gratuitamente l'auto nei nostri parcheggi privati e vivere la città in totale relax.",
        },
      ],
    },
    rooms: {
      intro:
        "Pensate per il comfort contemporaneo, con un design che si ispira al mondo del vino italiano. Disponibili anche camere familiari, perfette per chi viaggia con i bambini.",
      comforts: [
        "Aria condizionata",
        "Wi-Fi gratuito ad alta velocità",
        "Frigobar",
        "Sistema automatizzato per accesso camera e gestione clima",
        "Camere non fumatori",
        "Camere familiari disponibili",
        "Materiali e finiture curati",
      ],
    },
    services: [
      "Parcheggio privato gratuito",
      "Colazione servita sulle terrazze esterne, immerse nel verde",
      "Giardino relax con vista sulle montagne comasche",
      "Terrazze attrezzate con ombrelloni",
      "Camere familiari",
      "Deposito bagagli gratuito",
      "Bar con drink italiani e selezione di vini in vendita",
      "Wi-Fi gratuito in tutta la struttura",
      "Pet friendly — i tuoi animali sono benvenuti",
      "Servizio di pulizia giornaliero",
      "Videosorveglianza nelle aree comuni",
      "Personale formato regolarmente su sicurezza e accoglienza",
    ],
    position: {
      h2: "Vicino al Lago, ma immersi nella natura",
      paragraphs: [
        "L'hotel si trova in una posizione che combina due qualità rare per Como: l'immersione nel verde e la comodità di accesso al centro.",
        "Confiniamo con il parco di Villa Giovio e siamo vicini alla Basilica di Sant'Abbondio, in un'area classificata verde dal Comune. La fermata del bus per il centro è proprio davanti all'hotel: una corsa breve e si è in centro, sul lago, tra le vie storiche o all'imbarcadero per i battelli.",
      ],
    },
    sustainability: {
      intro:
        "In Hotel RossoVino Como crediamo in un'ospitalità rispettosa dell'ambiente. Negli anni abbiamo introdotto soluzioni concrete per ridurre sprechi, consumi e plastica, mantenendo sempre il comfort degli ospiti.",
      groups: [
        {
          title: "Energia",
          items: [
            "Pannelli solari per la produzione di acqua calda",
            "Illuminazione LED a basso consumo in tutta la struttura",
            "Sensori di presenza nelle aree comuni",
            "Controllo intelligente della climatizzazione",
            "Monitoraggio dei consumi energetici e idrici",
          ],
        },
        {
          title: "Plastica e prodotti",
          items: [
            "Dispenser ricaricabili per shampoo e saponi",
            "Forte riduzione delle bottiglie monouso",
            "Detergenti selezionati a basso impatto",
          ],
        },
        {
          title: "Acqua, lavanderia, rifiuti",
          items: [
            "Cambio asciugamani e lenzuola ottimizzato (su richiesta)",
            "Riduzione degli sprechi nella lavanderia",
            "Raccolta differenziata in tutta la struttura",
          ],
        },
        {
          title: "Anche a colazione",
          items: [
            "Particolare attenzione alla riduzione degli sprechi",
            "Valorizzazione dei prodotti locali del territorio comasco",
          ],
        },
      ],
    },
    ctaFinal: {
      title: "Pronto a vivere Como con noi?",
      body: "Verifica la disponibilità in tempo reale, oppure contattaci direttamente — siamo a un click di distanza.",
    },
    faq: [
      {
        q: "Hotel RossoVino Como è un hotel di che categoria?",
        a: "È un hotel 3 stelle a Como, immerso in un'area verde della città. Una struttura con un'identità precisa ispirata al mondo del vino italiano, pensata per chi cerca un'esperienza più autentica rispetto al classico hotel sul lago.",
      },
      {
        q: "L'hotel è vicino al Lago di Como?",
        a: "Sì, siamo a Como città, in un'area verde della città vicina al lago e ben collegata al centro. (Distanza esatta da inserire.)",
      },
      {
        q: "C'è il parcheggio?",
        a: "Sì, parcheggio privato gratuito per i nostri ospiti. La fermata del bus per il centro è proprio davanti all'hotel: molti ospiti scelgono di lasciare l'auto e muoversi in bus per evitare il traffico del centro turistico.",
      },
      {
        q: "Avete camere per famiglie?",
        a: "Sì, abbiamo camere familiari disponibili — adatte a soggiorni con bambini.",
      },
      {
        q: "Accettate animali domestici?",
        a: "Sì, siamo pet friendly. I tuoi animali sono benvenuti.",
      },
      {
        q: "Si può fare colazione all'aperto?",
        a: "Sì, la colazione viene servita sulle terrazze esterne immerse nel verde, con vista sulle montagne comasche. Privilegiamo prodotti locali del territorio.",
      },
      {
        q: "Posso acquistare vini in hotel?",
        a: "Sì, abbiamo una selezione di vini italiani disponibili in struttura, da gustare sul posto o portare a casa.",
      },
      {
        q: "Cosa rende speciale Hotel RossoVino Como rispetto agli altri hotel sul Lago?",
        a: "La combinazione di tre cose: la posizione in un'area verde della città (vicino a Villa Giovio e Basilica di Sant'Abbondio), l'identità RossoVino con camere ispirate ai grandi vini italiani e calice di benvenuto, e uno staff locale che condivide la sua Como reale, fuori dai percorsi turistici più battuti.",
      },
    ],
  },
};

/** Group-level content for the homepage. */
export const HOME_CONTENT = {
  meta: {
    title: "Hotel RossoVino — Tre proprietà a Milano e Como, ispirate al mondo del vino",
    description:
      "Gruppo Hotel RossoVino: Boutique a Milano in villa storica, Hotel 2 stelle a Milano centro, Hotel 3 stelle a Como nel verde. Ospitalità autentica e camere ispirate ai grandi vini italiani.",
  },
  hero: {
    h1: "Tre hotel, una sola anima: il vino italiano",
    subtitle:
      "Boutique e hotel a Milano e Como. Camere che portano il nome dei grandi vini, un calice di benvenuto al tuo arrivo, e l'ospitalità di chi conosce davvero il territorio.",
  },
  propertiesSectionTitle: "Le tre proprietà del gruppo",
  experience: {
    h2: "L'esperienza RossoVino",
    intro:
      "Tre strutture diverse per posizione e categoria, unite da un'unica identità: l'amore per il mondo enologico italiano e l'ospitalità autentica.",
    pillars: [
      {
        title: "Un brindisi di benvenuto",
        body: "Ogni arrivo si apre con un calice di vino italiano — il primo gesto dell'esperienza RossoVino, in tutte e tre le strutture.",
      },
      {
        title: "Camere come grandi vini",
        body: "Niente numeri impersonali: ogni stanza porta il nome di un vino italiano d'autore. Un dettaglio che rende ogni soggiorno più memorabile.",
      },
      {
        title: "Consigli di chi vive il territorio",
        body: "Il nostro staff vive Milano e Como ogni giorno. I consigli che ricevi sono reali — ristoranti, angoli, esperienze fuori dai percorsi turistici.",
      },
    ],
  },
  sustainability: {
    h2: "Sostenibilità concreta, ogni giorno",
    body: "In tutte le strutture RossoVino facciamo scelte concrete per ridurre consumi, plastica e sprechi — senza rinunciare al comfort degli ospiti. Illuminazione LED, dispenser ricaricabili, climatizzazione intelligente, raccolta differenziata. A Como, anche pannelli solari per l'acqua calda.",
  },
  ctaFinal: {
    title: "Trova la tua RossoVino",
    body: "Scegli la struttura che fa per te e verifica la disponibilità in tempo reale.",
  },
};
