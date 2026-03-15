import { TEMPLATES } from "./templates";
import { FAQS } from "./siteData";

const PAGES = [
  {
    id: "home",
    type: "page",
    title: "Home",
    excerpt: "Free premium website templates and custom web development.",
    page: "home",
    tags: ["templates", "custom development", "landing"],
  },
  {
    id: "templates",
    type: "page",
    title: "Templates",
    excerpt: "Browse all free templates by category.",
    page: "templates",
    tags: ["templates", "download", "free"],
  },
  {
    id: "services",
    type: "page",
    title: "Services",
    excerpt: "Custom web development services, pricing, and process.",
    page: "services",
    tags: ["services", "web development", "pricing"],
  },
  {
    id: "about",
    type: "page",
    title: "About",
    excerpt: "Learn about Shahriar Themes and the mission behind the templates.",
    page: "about",
    tags: ["about", "mission", "creator"],
  },
  {
    id: "contact",
    type: "page",
    title: "Contact",
    excerpt: "Get in touch for custom work or questions.",
    page: "contact",
    tags: ["contact", "quote", "email"],
  },
  {
    id: "faq",
    type: "page",
    title: "FAQ",
    excerpt: "Answers about licensing, downloads, and timelines.",
    page: "faq",
    tags: ["faq", "licence", "downloads"],
  },
  {
    id: "terms",
    type: "page",
    title: "Terms & Conditions",
    excerpt: "Usage rights and restrictions for templates and services.",
    page: "terms",
    tags: ["terms", "licence", "legal"],
  },
  {
    id: "privacy",
    type: "page",
    title: "Privacy Policy",
    excerpt: "How data is collected and used.",
    page: "privacy",
    tags: ["privacy", "data", "legal"],
  },
];

const SERVICES = [
  {
    id: "service-landing",
    type: "service",
    title: "Landing Page Development",
    excerpt: "Conversion-focused landing pages with analytics and A/B testing ready structure.",
    page: "services",
    tags: ["landing page", "conversion", "cta", "analytics"],
  },
  {
    id: "service-portfolio",
    type: "service",
    title: "Portfolio Websites",
    excerpt: "Standout personal sites for developers, designers, and creators.",
    page: "services",
    tags: ["portfolio", "personal site", "projects"],
  },
  {
    id: "service-business",
    type: "service",
    title: "Business Websites",
    excerpt: "Multi-page business sites with CMS, SEO, and booking integrations.",
    page: "services",
    tags: ["business", "cms", "seo"],
  },
  {
    id: "service-figma",
    type: "service",
    title: "Figma / PSD to HTML",
    excerpt: "Pixel-perfect implementation of design files with clean, responsive code.",
    page: "services",
    tags: ["figma", "psd", "html"],
  },
];

const FAQ_ITEMS = FAQS.map((faq, index) => ({
  id: `faq-${index}`,
  type: "faq",
  title: faq.q,
  excerpt: faq.a,
  page: "faq",
  tags: ["faq", "help"],
}));

const TEMPLATE_ITEMS = TEMPLATES.map((template) => ({
  id: `template-${template.id}`,
  type: "template",
  title: template.name,
  excerpt: template.desc,
  page: "templates",
  templateId: template.id,
  category: template.category,
  tags: [template.category, ...(template.tech || []), ...(template.features || [])],
  downloads: template.downloads,
}));

export const SITE_INDEX = [...PAGES, ...SERVICES, ...FAQ_ITEMS, ...TEMPLATE_ITEMS];
