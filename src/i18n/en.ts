export const en = {
  meta: {
    title: "Henrique Kasprzak — Full-stack developer, Go & React",
    description:
      "I build systems that read the physical world — cameras, sensors, trucks — and keep the data honest. Smart-city microservices in Go, interfaces in React. Curitiba, Brazil.",
  },

  nav: {
    skip: "Skip to content",
    work: "Work",
    about: "About",
    resume: "Résumé",
    home: "Home",
  },

  ui: {
    toggleTheme: "Switch to dark theme",
    toggleThemeLight: "Switch to light theme",
    languageLabel: "Language",
    backToWork: "All work",
  },

  hero: {
    name: "Henrique Kasprzak",
    photoAlt: "Portrait of Henrique Kasprzak",
    headline: "I build systems that read the physical world and keep the data honest.",
    intro:
      "Full-stack developer in Curitiba, Brazil — Go on the backend, React on the front. At Metropolys I write the services behind a smart-city platform: plate and face recognition, camera control, telemetry from sensors across a city, and the screens operators watch it all from. Off the clock I build complete systems on my own, end to end.",
    availability: "Open to backend and full-stack roles, remote or in Curitiba.",
    whatsappCta: "Message me on WhatsApp",
    workCta: "Read the case studies",
    facts: [
      { label: "Now", value: "Developer at Metropolys" },
      { label: "Focus", value: "Go services, real-time data" },
      { label: "Based in", value: "Curitiba, Brazil" },
      { label: "Degree", value: "Computer Engineering, 2026" },
    ],
  },

  trace: {
    title: "One plate, end to end",
    caption:
      "The path a single detection takes through the recognition service I wrote at Metropolys. Each stage adds what it knows.",
    replay: "Replay",
    running: "Running",
    stageLabel: "Stage",
    payloadLabel: "Event payload",
    steps: [
      {
        key: "detect",
        label: "Camera detects",
        note: "A camera on a city pole reads a plate and posts it to a webhook.",
        payload: `{
  "camera_id": "CAM-1183",
  "captured_at": "2026-09-17T13:42:08Z",
  "plate": "RJK4C19",
  "confidence": 0.94
}`,
      },
      {
        key: "store",
        label: "Image stored",
        note: "The plate crop is pulled from the camera and written to object storage.",
        payload: `{
  "camera_id": "CAM-1183",
  "plate": "RJK4C19",
  "confidence": 0.94,
  "image": "anpr/2026/09/17/RJK4C19-1342.jpg"
}`,
      },
      {
        key: "dedupe",
        label: "Deduplicated",
        note: "Every event gets a deterministic SHA-256 fingerprint, so the same read delivered twice — a retried webhook, a second ingestion path — is stored once.",
        payload: `{
  "plate": "RJK4C19",
  "image": "anpr/2026/09/17/RJK4C19-1342.jpg",
  "fingerprint": "e3b0c44298fc1c14",
  "duplicate": false
}`,
      },
      {
        key: "enrich",
        label: "Vehicle resolved",
        note: "The plate is enriched with make, model and colour from the vehicle registry.",
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
        label: "Lists checked",
        note: "The plate is matched against restriction lists, each carrying its own priority.",
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
        label: "Alert raised",
        note: "The highest-priority hit wins. A stolen vehicle reaches the operator immediately.",
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
    label: "Signals from a city and a fleet arriving at one operations hub",
    hub: "Operations",
    caption: "Seven kinds of signal, one place they all arrive.",
    nodes: [
      { key: "plate", label: "Plate camera", event: "Plate read" },
      { key: "face", label: "Face camera", event: "Face match" },
      { key: "signal", label: "Traffic light", event: "Signal fault" },
      { key: "lamp", label: "Streetlight", event: "Lamp offline" },
      { key: "rain", label: "Rain gauge", event: "6 h rainfall" },
      { key: "bus", label: "Bus", event: "Position update" },
      { key: "truck", label: "Truck, in the field", event: "Inspection synced" },
    ],
  },

  work: {
    title: "Selected work",
    intro:
      "Five systems, written up the way I'd explain them to another engineer: what the problem actually was, what I chose, and what it cost.",
    read: "Read the case study",
    present: "present",
    roleLabel: "Role",
    stackLabel: "Built with",
    sole: "Sole author",
    team: "Team",
  },

  about: {
    title: "About",
    lede: "Computer engineer, backend by instinct, shipping things that run in production.",
    body: [
      "I graduated in Computer Engineering from Universidade Positivo in 2026 and work as a developer at Metropolys, on a platform that pulls a city's data into one place in real time. Most of what I write is Go: ingestion services for plate reads and face matches from camera platforms, with watchlist alerts for both; a PTZ camera-control service; feeds for public transit, traffic and weather; and sensor and street-lighting telemetry over MQTT. I also built the KPI service that turns all of it into comparable indicators across cities, and the simulators that let us test the whole pipeline without a single physical camera.",
      "When something needs a front end, I build that too — a React overlay for driving PTZ cameras over a live video stream, a camera mosaic with draggable tiles and a map for the operations dashboard, and the product screens where an operator searches a plate, follows a vehicle across the city and manages the lists that raise alerts.",
      "Outside work I build complete systems alone, which is where I've learned the most: what a migration strategy is for, why an offline-first app is mostly a conflict-resolution problem, and how quickly an audit trail becomes worthless if nothing makes it tamper-evident.",
      "My bias is toward simple and direct. I'd rather write a lean HTTP handler than adopt a framework, and understand a problem than add a dependency. I use AI seriously as a tool — for research, prototyping and review — without handing over my understanding of what I've built.",
    ],
    skillsTitle: "What I work with",
    skills: [
      { name: "Languages", items: ["Go", "TypeScript", "JavaScript", "C", "C++", "Java", "SQL", "Bash"] },
      { name: "Backend and real-time", items: ["REST", "WebSocket", "SSE", "MQTT", "Webhooks", "Chi", "Microservices", "Multi-tenancy"] },
      { name: "Frontend", items: ["React 19", "Next.js", "Vite", "Tailwind", "Recharts", "Radix UI", "Leaflet", "htmx"] },
      { name: "Data and storage", items: ["PostgreSQL", "PostGIS", "SQLite", "Redis", "Supabase", "S3 and Object Lock", "Goose", "pgx"] },
      { name: "Infrastructure", items: ["Docker", "Kubernetes", "Caddy", "systemd", "GitHub Actions", "Vercel", "Render", "MagaLU Cloud"] },
      { name: "Operability", items: ["Prometheus", "OpenTelemetry", "Zerolog", "ADRs", "Retry and backoff"] },
      { name: "Hardware and vision", items: ["ESP32", "Raspberry Pi", "ADC sensors", "LPR / ANPR", "Facial recognition", "PTZ control"] },
    ],
    educationTitle: "Education",
    education: [
      { school: "Universidade Positivo", degree: "B.Sc. Computer Engineering", period: "2021 – 2026" },
    ],
    coursesTitle: "Courses",
    courses: [
      "Go (Golang) — Udemy, 60 h",
      "React with REST APIs — Udemy, 30 h",
      "GitHub — Udemy, 20 h",
      "Dale Carnegie — communication and leadership",
    ],
    languagesTitle: "Languages",
    languages: [
      { name: "Portuguese", level: "Native" },
      { name: "English", level: "Reading, writing and conversation" },
    ],
  },

  contact: {
    title: "Get in touch",
    body: "Email or WhatsApp, whichever you prefer. I read everything and reply.",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
    resumeLabel: "Download résumé",
    resumeNote: "PDF, English",
  },

  footer: {
    builtWith: "Built with Next.js and deployed on Vercel.",
    source: "Source on GitHub",
  },

  notFound: {
    title: "Nothing here",
    body: "That page doesn't exist. The work is probably what you were after.",
    cta: "Go to the work",
  },
};

export type Dictionary = typeof en;
