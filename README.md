# MediAnalytics Pro

Demo dashboard per una clinica di fisioterapia. Progetto portfolio realizzato con Next.js 16 e React 19.

## Funzionalità

- **Overview** — KPI clinica, grafici ricavi e distribuzione trattamenti
- **Pazienti** — anagrafica, filtri, ricerca, dialog "Nuovo Paziente"
- **Appuntamenti** — agenda sedute, stati, dialog "Nuovo Appuntamento"
- **Trattamenti** — catalogo prestazioni con prezzi e durata
- **Terapeuti** — staff clinica con specializzazioni e disponibilità
- **Inventario** — materiali, scorte, soglie di riordino
- **Analytics** — metriche avanzate, trend mensili, performance terapeuti
- **Fatturazione** — fatture emesse, stati pagamento, dialog "Nuova Fattura"
- **Impostazioni** — profilo clinica, preferenze, notifiche

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS 4 + shadcn/ui
- Recharts per i grafici
- Zustand per lo state client
- Bun come runtime e package manager

## Avvio rapido

```bash
bun install
bun run dev
```

Apri [http://localhost:3000](http://localhost:3000).

Build di produzione:

```bash
bun run build
bun run start
```

## Struttura

```
src/
├── app/dashboard/    # route App Router
├── features/         # componenti per dominio
├── components/ui/    # primitive shadcn/ui
└── lib/data/         # dataset mock (pazienti, appuntamenti, ...)
```

## Note

Progetto **dimostrativo**: dati mock, form non persistono, auth e pagamenti simulati. Pensato per mostrare competenze UI/UX, architettura feature-based e uso idiomatico di Next.js + shadcn/ui.
