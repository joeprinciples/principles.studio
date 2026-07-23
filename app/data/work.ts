// Case studies. Prose here is honest starter content, edit `intro` / `work` to
// tell the full story of your involvement. `visuals` are placeholder slots; the
// count controls how many image frames render on the case-study page.
export interface CaseStudy {
  slug: string;
  name: string;
  url: string;
  urlLabel: string;
  category: string;
  role: string;
  tags: string[];
  summary: string; // one line, used on the /work grid card
  intro: string; // lead paragraph on the case-study page
  work: string[]; // "the work" paragraphs, expand these
  visuals: number; // how many placeholder image frames to show
  beforeAfter?: boolean; // renders the drag-to-compare slider (Kress)
  kind: "client" | "product";
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "kress",
    name: "Kress",
    url: "https://www.kressinc.com",
    urlLabel: "kressinc.com",
    category: "Rebrand",
    role: "Brand, design system, build",
    tags: ["Branding", "Rebrand", "Design system", "ProcessWire"],
    summary: "A ground-up rebrand, from logo and design system to the live site.",
    intro:
      "Kress needed a full rebrand: a new identity, and a design system that could carry it consistently across everything, then a site built on top of it.",
    work: [
      "I took Kress from the logo up: a new mark, brand guidelines, colour and type, and a full design system with a Figma library so everything downstream stays consistent.",
      "That system then carried straight through to the live site, built on ProcessWire.",
    ],
    visuals: 4,
    beforeAfter: true,
    kind: "client",
  },
  {
    slug: "greenfields",
    name: "Greenfields",
    url: "https://greenfieldspenrith.com",
    urlLabel: "greenfieldspenrith.com",
    category: "PPC & landing pages",
    role: "Landing pages, CRM, paid search",
    tags: ["PPC", "Landing pages", "CRM"],
    summary: "High-converting landing pages, CRM integration and ongoing paid-search support.",
    intro:
      "Greenfields needed paid search that actually converted, and the landing pages and plumbing to make the most of every click.",
    work: [
      "I built the campaign landing pages, focused on turning paid traffic into enquiries, and integrated their CRM so leads flow straight through.",
      "I provide ongoing PPC and development support to keep the campaigns and pages performing.",
    ],
    visuals: 3,
    kind: "client",
  },
  {
    slug: "echo-finance",
    name: "Echo Finance",
    url: "https://www.echofinance.co.uk",
    urlLabel: "echofinance.co.uk",
    category: "Web, SEO & performance",
    role: "Web, content structure, performance",
    tags: ["Web", "SEO", "Performance"],
    summary: "Location pages, B2B resources and a site-speed overhaul on ProcessWire.",
    intro:
      "Echo Finance needed their site to work harder for search and for B2B visitors, and to load faster doing it.",
    work: [
      "I built out location pages and B2B resource sections, and ran a site-speed overhaul, on their ProcessWire platform.",
    ],
    visuals: 3,
    kind: "client",
  },
  {
    slug: "leadcrowd",
    name: "LeadCrowd",
    url: "https://www.leadcrowd.com",
    urlLabel: "leadcrowd.com",
    category: "UI system & CRM",
    role: "UI system, CRM, authority features",
    tags: ["UI system", "CRM", "E-E-A-T"],
    summary: "A reusable UI system, CRM tooling and search-authority features.",
    intro:
      "LeadCrowd needed a consistent UI to build on, tooling to manage their pipeline, and the credibility signals search rewards.",
    work: [
      "I built a reusable UI system and CRM tooling, plus authority features like author bios and credibility signals to strengthen search trust.",
    ],
    visuals: 3,
    kind: "client",
  },
  {
    slug: "moneyhelpdesk",
    name: "MoneyHelpDesk",
    url: "https://www.moneyhelpdesk.com",
    urlLabel: "moneyhelpdesk.com",
    category: "Web, tools & CRM",
    role: "Tools, components, CRM",
    tags: ["Web", "Tools", "CRM"],
    summary: "Interactive calculators, homepage components and CRM work for a busy finance site.",
    intro:
      "MoneyHelpDesk is a busy consumer-finance site that needed useful interactive tools and a homepage that pulls its weight.",
    work: [
      "I built interactive financial calculators, homepage components and CRM work to help the site turn visitors into customers.",
    ],
    visuals: 3,
    kind: "client",
  },
  {
    slug: "singlio",
    name: "Singlio",
    url: "https://singl.io",
    urlLabel: "singl.io",
    category: "Product",
    role: "Design, build, ship",
    tags: ["Product", "Mobile"],
    summary: "My own focus-training app, live on Google Play.",
    intro:
      "Singlio is my own product: a focus-training app that scores and strengthens attention.",
    work: [
      "I designed, built and shipped Singlio end to end. It's live on Google Play, with iOS to follow.",
    ],
    visuals: 3,
    kind: "product",
  },
  {
    slug: "thyroidtools",
    name: "ThyroidTools",
    url: "https://thyroidtools.com",
    urlLabel: "thyroidtools.com",
    category: "Product",
    role: "Design, build, host",
    tags: ["Product", "Web"],
    summary: "A UK thyroid-health resource with recipes, tools and a community.",
    intro:
      "ThyroidTools is my own project: a UK thyroid-health resource with recipes, tools and a moderated community.",
    work: [
      "I designed and built it on Nuxt with a self-hosted backend, including the moderated community and submission tooling.",
    ],
    visuals: 3,
    kind: "product",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
