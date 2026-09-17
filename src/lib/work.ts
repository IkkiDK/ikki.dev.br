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
    stack: ["Go", "PostgreSQL", "htmx", "PWA", "MinIO / S3", "Goose", "GitHub Actions", "MagaLU Cloud"],
    links: [],
    title: { en: "Xanadu Fleet", pt: "Xanadu Fleet" },
    tagline: {
      en: "Inspections that survive with no signal",
      pt: "Inspeções que sobrevivem sem sinal",
    },
    summary: {
      en: "A fleet inspection and maintenance system for a transport company: versioned checklists filled in on the roadside with no connectivity, and an evidence chain that makes the records worth trusting.",
      pt: "Um sistema de inspeção e manutenção de frota para uma transportadora: checklists versionados preenchidos na beira da estrada sem conexão, e uma cadeia de evidências que torna os registros confiáveis.",
    },
    role: { en: "Sole author, around 130 commits", pt: "Autor único, cerca de 130 commits" },
  },
  {
    slug: "metropolys",
    from: "2024",
    to: null,
    solo: false,
    stack: ["Go", "PostgreSQL / PostGIS", "Redis", "MQTT", "WebSocket", "Kubernetes", "React 19", "Prometheus"],
    links: [],
    title: { en: "Smart-city platform", pt: "Plataforma de cidade inteligente" },
    tagline: {
      en: "A city's cameras and sensors, in one place, in real time",
      pt: "As câmeras e sensores de uma cidade, num lugar só, em tempo real",
    },
    summary: {
      en: "My day job at Metropolys. Go services that ingest plate recognition, facial detection, transit feeds, traffic and street-lighting telemetry, plus the React surfaces operators actually drive them from.",
      pt: "Meu trabalho na Metropolys. Serviços em Go que recebem reconhecimento de placas, detecção facial, feeds de transporte, trânsito e telemetria de iluminação pública, mais as telas em React que os operadores de fato usam.",
    },
    role: {
      en: "Primary author of several services, contributor across the platform",
      pt: "Autor principal de vários serviços, contribuidor na plataforma",
    },
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
    to: "2025",
    solo: true,
    stack: ["React 19", "Vite", "Framer Motion", "Tailwind", "Cloudinary", "Vercel"],
    links: [{ label: "xanadutransportes.com.br", href: "https://xanadutransportes.com.br" }],
    title: { en: "Xanadu Transportes", pt: "Xanadu Transportes" },
    tagline: {
      en: "A haulage company's first website",
      pt: "O primeiro site de uma transportadora",
    },
    summary: {
      en: "A transport company whose customers found it by phone number alone. A single page that loads fast on a truck-stop connection and puts a WhatsApp conversation one tap away.",
      pt: "Uma transportadora cujos clientes a encontravam só pelo telefone. Uma página única que carrega rápido numa conexão de posto de estrada e coloca uma conversa no WhatsApp a um toque.",
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
