import type { Dictionary } from "./en";

export const pt: Dictionary = {
  meta: {
    title: "Henrique Kasprzak — Desenvolvedor full-stack, Go e React",
    description:
      "Construo sistemas que leem o mundo físico — câmeras, sensores, caminhões — e mantêm os dados íntegros. Microsserviços de cidade inteligente em Go, interfaces em React. Curitiba, Brasil.",
  },

  nav: {
    skip: "Pular para o conteúdo",
    work: "Projetos",
    about: "Sobre",
    resume: "Currículo",
    home: "Início",
  },

  ui: {
    toggleTheme: "Mudar para o tema escuro",
    toggleThemeLight: "Mudar para o tema claro",
    languageLabel: "Idioma",
    backToWork: "Todos os projetos",
  },

  hero: {
    name: "Henrique Derviche Kasprzak",
    photoAlt: "Retrato de Henrique Kasprzak",
    headline: "Construo sistemas que leem o mundo físico e mantêm os dados íntegros.",
    intro:
      "Desenvolvedor full-stack em Curitiba — Go no backend, React no front. Na Metropolys escrevo os serviços por trás de uma plataforma de cidade inteligente: reconhecimento de placas e faces, controle de câmeras, telemetria de sensores espalhados pela cidade e as telas de onde os operadores acompanham tudo isso. Fora do trabalho, construo sistemas completos sozinho, de ponta a ponta.",
    availability: "Aberto a vagas de backend e full-stack, remoto ou em Curitiba.",
    whatsappCta: "Chamar no WhatsApp",
    workCta: "Ler os estudos de caso",
    facts: [
      { label: "Hoje", value: "Desenvolvedor na Metropolys" },
      { label: "Foco", value: "Serviços em Go, dados em tempo real" },
      { label: "Base", value: "Curitiba, Brasil" },
      { label: "Formação", value: "Engenharia de Computação, 2026" },
    ],
  },

  trace: {
    title: "Uma placa, de ponta a ponta",
    caption:
      "O caminho que uma única detecção percorre no serviço de reconhecimento que escrevi na Metropolys. Cada etapa acrescenta o que sabe.",
    replay: "Repetir",
    running: "Executando",
    stageLabel: "Etapa",
    payloadLabel: "Payload do evento",
    steps: [
      {
        key: "detect",
        label: "Câmera detecta",
        note: "Uma câmera em um poste lê a placa e envia o evento para um webhook.",
        payload: `{
  "camera_id": "CAM-1183",
  "captured_at": "2026-09-17T13:42:08Z",
  "plate": "RJK4C19",
  "confidence": 0.94
}`,
      },
      {
        key: "store",
        label: "Imagem armazenada",
        note: "O recorte da placa é baixado da câmera e gravado no object storage.",
        payload: `{
  "camera_id": "CAM-1183",
  "plate": "RJK4C19",
  "confidence": 0.94,
  "image": "anpr/2026/09/17/RJK4C19-1342.jpg"
}`,
      },
      {
        key: "dedupe",
        label: "Deduplicado",
        note: "Cada evento recebe um fingerprint SHA-256 determinístico, então a mesma leitura entregue duas vezes — um webhook reenviado, um segundo caminho de ingestão — é gravada uma vez só.",
        payload: `{
  "plate": "RJK4C19",
  "image": "anpr/2026/09/17/RJK4C19-1342.jpg",
  "fingerprint": "e3b0c44298fc1c14",
  "duplicate": false
}`,
      },
      {
        key: "enrich",
        label: "Veículo identificado",
        note: "A placa é enriquecida com marca, modelo e cor vindos do registro de veículos.",
        payload: `{
  "plate": "RJK4C19",
  "fingerprint": "e3b0c44298fc1c14",
  "vehicle": {
    "make": "VW", "model": "Saveiro",
    "color": "white", "year": 2019
  }
}`,
      },
      {
        key: "match",
        label: "Listas verificadas",
        note: "A placa é cruzada com listas de restrição, cada uma com sua própria prioridade.",
        payload: `{
  "plate": "RJK4C19",
  "vehicle": { "make": "VW", "model": "Saveiro" },
  "matches": [
    { "list": "stolen_vehicles", "hit": true, "priority": 1 },
    { "list": "unpaid_tolls",    "hit": true, "priority": 4 }
  ]
}`,
      },
      {
        key: "alert",
        label: "Alerta disparado",
        note: "A ocorrência de maior prioridade vence. Um veículo roubado chega ao operador na hora.",
        payload: `{
  "plate": "RJK4C19",
  "alert": {
    "reason": "stolen_vehicles",
    "priority": 1,
    "channel": "operations_dashboard",
    "dispatched_at": "2026-09-17T13:42:09Z"
  }
}`,
      },
    ],
  },

  signals: {
    label: "Sinais de uma cidade e de uma frota chegando a um único centro de operações",
    hub: "Operações",
    caption: "Sete tipos de sinal, um lugar onde todos chegam.",
    nodes: [
      { key: "plate", label: "Câmera de placas", event: "Leitura de placa" },
      { key: "face", label: "Câmera facial", event: "Face reconhecida" },
      { key: "signal", label: "Semáforo", event: "Falha no semáforo" },
      { key: "lamp", label: "Poste de luz", event: "Lâmpada apagada" },
      { key: "rain", label: "Pluviômetro", event: "Chuva em 6 h" },
      { key: "bus", label: "Ônibus", event: "Posição atualizada" },
      { key: "truck", label: "Caminhão, no campo", event: "Inspeção sincronizada" },
    ],
  },

  work: {
    title: "Projetos selecionados",
    intro:
      "Cinco sistemas, descritos como eu explicaria para outra pessoa da engenharia: qual era o problema de verdade, o que escolhi e quanto custou.",
    read: "Ler o estudo de caso",
    present: "hoje",
    roleLabel: "Papel",
    stackLabel: "Feito com",
    sole: "Autor único",
    team: "Time",
  },

  about: {
    title: "Sobre",
    lede: "Engenheiro de computação, backend por instinto, entregando coisas que rodam em produção.",
    body: [
      "Formei-me em Engenharia de Computação pela Universidade Positivo em 2026 e trabalho como desenvolvedor na Metropolys, em uma plataforma que reúne os dados de uma cidade em tempo real. A maior parte do que escrevo é Go: serviços de ingestão de leituras de placa e reconhecimentos faciais vindos de plataformas de câmeras, com alertas de listas de interesse para os dois; um serviço de controle de câmeras PTZ; feeds de transporte público, trânsito e clima; e telemetria de sensores e iluminação pública sobre MQTT. Também construí o serviço de KPIs que transforma tudo isso em indicadores comparáveis entre cidades, e os simuladores que permitem testar o pipeline inteiro sem uma única câmera física.",
      "Quando algo precisa de front-end, eu construo também — um overlay em React para controlar câmeras PTZ sobre o vídeo ao vivo, um mosaico de câmeras com blocos arrastáveis e mapa para o painel de operações, e as telas do produto em que um operador pesquisa uma placa, segue um veículo pela cidade e gerencia as listas que disparam alertas.",
      "Fora do trabalho construo sistemas completos sozinho, e foi aí que mais aprendi: para que serve uma estratégia de migrações, por que um app offline-first é sobretudo um problema de resolução de conflitos, e com que rapidez uma trilha de auditoria perde o valor se nada a torna à prova de adulteração.",
      "Minha tendência é buscar o simples e direto. Prefiro escrever um handler HTTP enxuto a adotar um framework, e entender um problema a acrescentar uma dependência. Uso IA a sério como ferramenta — pesquisa, protótipo e revisão — sem abrir mão de entender o que construí.",
    ],
    skillsTitle: "Com o que eu trabalho",
    skills: [
      { name: "Linguagens", items: ["Go", "TypeScript", "JavaScript", "C", "C++", "Java", "SQL", "Bash"] },
      { name: "Backend e tempo real", items: ["REST", "WebSocket", "SSE", "MQTT", "Webhooks", "Chi", "Microsserviços", "Multi-tenancy"] },
      { name: "Frontend", items: ["React 19", "Next.js", "Vite", "Tailwind", "Recharts", "Radix UI", "Leaflet", "htmx"] },
      { name: "Dados e armazenamento", items: ["PostgreSQL", "PostGIS", "SQLite", "Redis", "Supabase", "S3 e Object Lock", "Goose", "pgx"] },
      { name: "Infraestrutura", items: ["Docker", "Kubernetes", "Caddy", "systemd", "GitHub Actions", "Vercel", "Render", "MagaLU Cloud"] },
      { name: "Operação", items: ["Prometheus", "OpenTelemetry", "Zerolog", "ADRs", "Retry e backoff"] },
      { name: "Hardware e visão", items: ["ESP32", "Raspberry Pi", "Sensores ADC", "LPR / ANPR", "Reconhecimento facial", "Controle PTZ"] },
    ],
    educationTitle: "Formação",
    education: [
      { school: "Universidade Positivo", degree: "Bacharelado em Engenharia de Computação", period: "2021 – 2026" },
    ],
    coursesTitle: "Cursos",
    courses: [
      "Go (Golang) — Udemy, 60 h",
      "React com APIs REST — Udemy, 30 h",
      "GitHub — Udemy, 20 h",
      "Dale Carnegie — comunicação e liderança",
    ],
    languagesTitle: "Idiomas",
    languages: [
      { name: "Português", level: "Nativo" },
      { name: "Inglês", level: "Leitura, escrita e conversação" },
    ],
  },

  contact: {
    title: "Entrar em contato",
    body: "E-mail ou WhatsApp, como preferir. Eu leio tudo e respondo.",
    emailLabel: "E-mail",
    whatsappLabel: "WhatsApp",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
    resumeLabel: "Baixar currículo",
    resumeNote: "PDF, português",
  },

  footer: {
    builtWith: "Feito com Next.js e publicado na Vercel.",
    source: "Código no GitHub",
  },

  notFound: {
    title: "Não há nada aqui",
    body: "Esta página não existe. Provavelmente você procurava os projetos.",
    cta: "Ver os projetos",
  },
};
