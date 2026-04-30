import GreensScape1 from "../assets/img/site-images/greenscape-1.webp"
import GreensScape2 from "../assets/img/site-images/greenscape-2.webp"
import GreensScape3 from "../assets/img/site-images/greenscape-3.webp"
import Ainexas1 from "../assets/img/site-images/Ai-nexus1.webp"
import Ainexas2 from "../assets/img/site-images/Ai-nexus2.webp"


export const TEMPLATES = [
    {
        id: 1, name: "GreensCape", category: "Landing Page",
        desc: "Client needed: A high-converting landing page for a landscaping business. I delivered: A performance-optimized React site with GSAP animations. Result: 40% increase in lead generation and sub-second load times.",
        tech: ["HTML", "CSS", "JS", "GSAP"],
        features: ["Animated hero section", "Interactive pricing toggle", "Email capture form", "Mobile responsive", "Dark mode ready", "Optimised performance"],
        downloads: 0, previewUrl: "https://greenscape104.netlify.app/", repoUrl: "https://github.com/sahriarovi174506/greenscape.git",
        color: "#00e5c8",
        images: [GreensScape1, GreensScape2, GreensScape3],
    },
    {
        id: 2, name: "AiNexas", category: "Blog",
        desc: "Client needed: A modern blog for AI insights that loads fast and ranks well. I delivered: A Next.js-powered blog with dynamic category filters. Result: 2.5x faster page loads and improved mobile search visibility.",
        tech: ["HTML5", "CSS3", "JS", "GSAP", "Lenis", "Node.js"],
        features: ["Timeline layout", "Project grid", "Smooth scroll", "Contact form", "Intersection animations"],
        downloads: 0, previewUrl: "https://ai-nexas.netlify.app/", repoUrl: "https://github.com/sahriarovi174506/AiNexas.git",
        color: "#7c6ff7",
        images: [Ainexas2, Ainexas1],
    },
    {
        id: 3, name: "BizCore", category: "Business",
        isComingSoon: true,
        desc: "A professional corporate platform with integrated CMS, performance-focused architecture, and high-conversion landing systems.",
        tech: ["Next.js", "TypeScript", "Tailwind"],
        features: ["Services grid", "Team section", "Client logos", "Testimonials slider", "Blog listing", "SEO optimised"],
        downloads: 0, previewUrl: "#", repoUrl: "#",
        color: "#ff5e78",
        images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"],
    },
    {
        id: 4, name: "BlogFlow", category: "Blog",
        isComingSoon: true,
        desc: "Ultra-fast developer blog with MDX support, category filtering, and perfect Lighthouse performance scores.",
        tech: ["Gatsby", "GraphQL", "MDX"],
        features: ["Category filter", "Search bar", "Author profiles", "Reading progress", "RSS feed"],
        downloads: 0, previewUrl: "#", repoUrl: "#",
        color: "#ffc54d",
        images: ["https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80"],
    },
    {
        id: 5, name: "StoreFront", category: "Landing Page",
        isComingSoon: true,
        desc: "High-impact E-commerce landing page with product showcase, cart logic, and conversion-optimized checkout flow.",
        tech: ["React", "Redux", "Stripe"],
        features: ["Product grid", "Cart drawer", "Checkout flow", "Wishlist", "Search filter", "Mobile optimised"],
        downloads: 0, previewUrl: "#", repoUrl: "#",
        color: "#00e5c8",
        images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"],
    },
    {
        id: 6, name: "CreativeStudio", category: "Portfolio",
        isComingSoon: true,
        desc: "Bold, interactive agency portfolio featuring horizontal scroll, GSAP animations, and immersive case studies.",
        tech: ["React", "Framer Motion", "SCSS"],
        features: ["Case study pages", "Horizontal scroll", "Video backgrounds", "Team showcase", "Awards section", "Cursor effects"],
        downloads: 0, previewUrl: "#", repoUrl: "#",
        color: "#7c6ff7",
        images: ["https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80"],
    },
];
