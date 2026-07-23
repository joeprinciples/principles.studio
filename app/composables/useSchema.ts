const SITE_URL = "https://principles.studio";

const organization = {
  "@type": "ProfessionalService" as const,
  name: "First Principles",
  legalName: "First Principles Studio Ltd",
  url: SITE_URL,
  logo: `${SITE_URL}/fp-logo.png`,
  description:
    "UX-first product and software studio working with businesses across the UK. I start from what your users actually need, then design and build up from there: brand, websites, campaigns and custom software.",
  founder: {
    "@type": "Person" as const,
    name: "Joseph Coulam",
  },
  areaServed: {
    "@type": "Country" as const,
    name: "United Kingdom",
  },
  knowsAbout: [
    "User experience design",
    "Usability",
    "Conversion rate optimisation",
    "Web design and development",
    "Branding and rebrands",
    "Pay-per-click advertising",
    "Custom software development",
  ],
  address: {
    "@type": "PostalAddress" as const,
    addressCountry: "GB",
  },
  // Add social links here when available:
  // sameAs: ["https://github.com/...", "https://linkedin.com/in/..."],
};

/** Shortened author block for use inside product schemas */
const author = {
  "@type": "Organization" as const,
  name: organization.legalName,
  url: organization.url,
};

/**
 * Build a JSON-LD SoftwareApplication + optional FAQPage schema.
 */
export function useProductSchema(options: {
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  price?: string;
  priceCurrency?: string;
  availability?: string;
  faqs?: { question: string; answer: string }[];
}) {
  const app: Record<string, unknown> = {
    "@type": "SoftwareApplication",
    name: options.name,
    description: options.description,
    applicationCategory: options.applicationCategory,
    operatingSystem: options.operatingSystem,
    offers: {
      "@type": "Offer",
      price: options.price ?? "0",
      priceCurrency: options.priceCurrency ?? "GBP",
      ...(options.availability && { availability: options.availability }),
    },
    author,
  };

  const graph: Record<string, unknown>[] = [app];

  if (options.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: options.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  return {
    type: "application/ld+json" as const,
    innerHTML: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
  };
}

/** The global ProfessionalService schema (used in nuxt.config head). */
export function useOrganizationSchema() {
  return {
    type: "application/ld+json" as const,
    innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      ...organization,
    }),
  };
}

/** BreadcrumbList JSON-LD for a sub-page. Pass ordered {name, path} crumbs. */
export function useBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    type: "application/ld+json" as const,
    innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        item: `${SITE_URL}${it.path}`,
      })),
    }),
  };
}

/** ProfessionalService + OfferCatalog for the /services page. */
export function useServicesSchema(services: { name: string; description: string }[]) {
  return {
    type: "application/ld+json" as const,
    innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: organization.legalName,
      url: `${SITE_URL}/services/`,
      areaServed: organization.areaServed,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.name,
            description: s.description,
          },
        })),
      },
    }),
  };
}
