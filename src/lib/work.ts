import type { Locale } from "@/i18n/config";

export type WorkLink = {
  label: string;
  href: string;
};

export type WorkEntry = {
  slug: string;
  from: string;
  /** null means the work is still running. */
  to: string | null;
  solo: boolean;
  stack: string[];
  links: WorkLink[];
  title: Record<Locale, string>;
  tagline: Record<Locale, string>;
  summary: Record<Locale, string>;
  role: Record<Locale, string>;
};

export const work: WorkEntry[] = [
  {
    slug: "xanadu-fleet",
    from: "2024",
    to: null,
    solo: true,
    stack: ["Go", "PostgreSQL", "htmx", "PWA", "S3 Object Lock (WORM)", "Ed25519", "Goose", "GitHub Actions", "MagaLU Cloud"],
    links: [],
    title: { en: "Xanadu Fleet", pt: "Xanadu Fleet" },
    tagline: {
      en: "Inspections that survive with no signal",
      pt: "Inspeções que sobrevivem sem sinal",
    },
    summary: {
      en: "A fleet inspection, fueling and maintenance system for a transport company: versioned checklists filled in on the roadside with no connectivity, records that are superseded rather than edited, and a signed evidence chain anchored to write-once storage.",
      pt: "Um sistema de inspeção, abastecimento e manutenção de frota para uma transportadora: checklists versionados preenchidos na beira da estrada sem conexão, registros que são substituídos em vez de editados, e uma cadeia de evidências assinada e ancorada em armazenamento write-once.",
    },
    role: { en: "Sole author, close to 300 commits", pt: "Autor único, perto de 300 commits" },
  },
  {
    slug: "metropolys",
    from: "2024",
    to: null,
    solo: false,
    stack: ["Go", "TypeScript", "React 19", "PostgreSQL / PostGIS", "Redis", "MQTT", "WebSocket", "Kubernetes", "Prometheus"],
    links: [],
    title: { en: "Smart-city platform", pt: "Plataforma de cidade inteligente" },
    tagline: {
      en: "A city's cameras and sensors, in one place, in real time",
      pt: "As câmeras e sensores de uma cidade, em um lugar só, em tempo real",
    },
    summary: {
      en: "My day job at Metropolys. Go services that ingest plate reads, face matches, transit feeds, traffic and weather telemetry, and the parts of the web product where operators search a plate, follow a vehicle across the city and receive watchlist alerts.",
      pt: "Meu trabalho na Metropolys. Serviços em Go que recebem leituras de placa, reconhecimentos faciais, feeds de transporte, trânsito e telemetria meteorológica, e as partes do produto web em que operadores pesquisam uma placa, seguem um veículo pela cidade e recebem alertas de listas de interesse.",
    },
    role: {
      en: "Primary author of several services and of the plate and face alerting screens; contributor across the platform",
      pt: "Autor principal de vários serviços e das telas de alertas de placa e face; contribuidor na plataforma",
    },
  },
  {
    slug: "manutencao-lavoura",
    from: "2026",
    to: null,
    solo: true,
    stack: ["Go", "SQLite", "htmx", "PWA", "Caddy", "systemd", "GitHub Actions"],
    links: [{ label: "lavoura.xanadutransportes.com.br", href: "https://lavoura.xanadutransportes.com.br" }],
    title: { en: "Manutenção Lavoura", pt: "Manutenção Lavoura" },
    tagline: {
      en: "A maintenance logbook that fits in one binary",
      pt: "Um diário de manutenção que cabe em um binário",
    },
    summary: {
      en: "Farm-equipment maintenance for two people — an agronomist and a farm manager — recorded on a phone in the field, often without signal. One Go binary and one SQLite file on a small server, with an offline outbox and a photo queue that never hold a record back.",
      pt: "Manutenção de máquinas agrícolas para duas pessoas — um agrônomo e um gerente de fazenda — registrada no celular, no campo, muitas vezes sem sinal. Um binário Go e um arquivo SQLite em um servidor pequeno, com uma fila offline e uma fila de fotos que nunca seguram um registro.",
    },
    role: { en: "Sole author", pt: "Autor único" },
  },
  {
    slug: "mini-estufa",
    from: "2025",
    to: "2025",
    solo: true,
    stack: ["Go", "gorilla/websocket", "React 19", "Vite", "Tailwind", "Recharts", "Supabase", "MQTT", "ESP32"],
    links: [
      { label: "Backend on GitHub", href: "https://github.com/IkkiDK/miniestufa-backend" },
      { label: "Dashboard on GitHub", href: "https://github.com/IkkiDK/miniestufa-dashboard" },
    ],
    title: { en: "Mini Estufa", pt: "Mini Estufa" },
    tagline: {
      en: "A greenhouse that reports on itself, from ADC pin to browser",
      pt: "Uma estufa que se reporta sozinha, do pino ADC ao navegador",
    },
    summary: {
      en: "My capstone project. I soldered the sensors, calibrated the readings, wrote the Go API that broadcasts them over WebSocket, and built the React dashboard that draws them — the full path from a voltage to a chart.",
      pt: "Meu TCC. Soldei os sensores, calibrei as leituras, escrevi a API em Go que as transmite por WebSocket e construí o dashboard em React que as desenha — o caminho inteiro de uma tensão até um gráfico.",
    },
    role: { en: "Sole author, hardware and software", pt: "Autor único, hardware e software" },
  },
  {
    slug: "xanadu-site",
    from: "2025",
    to: "2026",
    solo: true,
    stack: ["Next.js 15", "React 19", "Framer Motion", "Cloudinary", "Google Analytics 4", "Vercel"],
    links: [{ label: "xanadutransportes.com.br", href: "https://xanadutransportes.com.br" }],
    title: { en: "Xanadu Transportes", pt: "Xanadu Transportes" },
    tagline: {
      en: "A haulage company's first website",
      pt: "O primeiro site de uma transportadora",
    },
    summary: {
      en: "A transport company whose customers found it by phone number alone. A single prerendered page that loads fast on a truck-stop connection, puts a WhatsApp conversation one tap away, and only loads analytics after the visitor consents.",
      pt: "Uma transportadora cujos clientes a encontravam só pelo telefone. Uma página única pré-renderizada que carrega rápido em uma conexão de posto de estrada, coloca uma conversa no WhatsApp a um toque e só carrega analytics depois que o visitante consente.",
    },
    role: { en: "Sole author", pt: "Autor único" },
  },
];

export function getWork(slug: string): WorkEntry | undefined {
  return work.find((entry) => entry.slug === slug);
}

export function formatPeriod(entry: WorkEntry, present: string): string {
  if (entry.to === null) return `${entry.from} — ${present}`;
  if (entry.to === entry.from) return entry.from;
  return `${entry.from} — ${entry.to}`;
}
