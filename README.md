# MediAnalytics Pro

Dashboard professionale per **centri fisioterapia e benessere**, pensata per mostrare in modo chiaro pazienti, appuntamenti, trend operativi e overview economica.

Il progetto nasce come base di prodotto per una web app gestionale verticale: non un semplice backoffice generico, ma un'interfaccia orientata a realta' che lavorano con trattamenti, terapisti, pianificazione e controllo dei dati.

## Obiettivo

Mettere insieme un prototipo credibile e ben presentato per un software dedicato a studi e centri wellness, con attenzione a UX, leggibilita' e scalabilita' dell'interfaccia.

## Cosa include

- dashboard overview con KPI e grafici
- sezione pazienti con dati, stato e ricerca
- gestione appuntamenti
- aree dedicate a billing, analytics, terapisti, trattamenti e inventario
- notifiche e navigazione strutturata
- tema visuale personalizzato `medianalytics`
- layout responsive pensato per desktop e tablet

## Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `shadcn/ui`
- `Recharts`
- `Zustand`

## Stato del progetto

Attualmente il repository rappresenta soprattutto il **frontend/prototipo avanzato** del prodotto, con dati demo e struttura pronta per essere collegata a servizi reali.

E' utile per:

- demo commerciali
- validazione del concept
- evoluzione verso una dashboard SaaS o gestionale interno

## Avvio locale

Con `npm`:

```bash
npm install
npm run dev
```

Con `bun`:

```bash
bun install
bun run dev
```

Build produzione:

```bash
npm run build
npm run start
```

## Struttura del progetto

```text
src/
├── app/              Routing e pagine Next.js
├── components/       UI condivisa e layout
├── config/           Navigazione e configurazioni dashboard
├── features/         Moduli per overview, utenti, notifiche, auth
├── lib/              Utility e dati demo
├── styles/           Tema globale e varianti visuali
└── hooks/            Hook custom
```

## Posizionamento

MediAnalytics Pro e' pensato come progetto portfolio/prodotto dimostrativo nel settore health & wellness: una base visiva forte, facilmente estendibile verso reporting, agenda operativa e gestione clienti.
