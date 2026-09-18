export const site = {
  domain: "ikki.dev.br",
  url: "https://ikki.dev.br",
  author: "Henrique Derviche Kasprzak",
  shortName: "Henrique Kasprzak",
  locality: "Curitiba",
  region: "PR",
  country: "BR",
  email: "ihiquedk@gmail.com",
  github: "https://github.com/IkkiDK",
  githubHandle: "IkkiDK",
  linkedin: "https://www.linkedin.com/in/henrique-kasprzak",
  linkedinHandle: "henrique-kasprzak",
  whatsapp: {
    /** E.164 without the plus, as wa.me expects it. */
    number: "5542999405868",
    display: "+55 42 99940-5868",
  },
  repo: "https://github.com/IkkiDK/ikki.dev.br",
  /** Google Analytics 4 measurement ID; public by nature, it ships in the page. */
  analyticsId: "G-802KNWQW5W",
  resume: {
    en: "/henrique-kasprzak-resume.pdf",
    pt: "/henrique-kasprzak-curriculo.pdf",
  },
} as const;
