import { site } from "@/lib/site";

/** schema.org Person, so a search for the name can build a knowledge panel from the site. */
export function PersonSchema({ jobTitle }: { jobTitle: string }) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.author,
    alternateName: site.shortName,
    jobTitle,
    url: site.url,
    image: `${site.url}/henrique-kasprzak.jpg`,
    email: `mailto:${site.email}`,
    sameAs: [site.linkedin, site.github],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: site.country,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
    />
  );
}
