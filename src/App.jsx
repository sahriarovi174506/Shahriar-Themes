import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import { useScrollTop, useGsapSiteAnimations, useSmoothScroll } from "./hooks";
import AOS from "aos";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";

const TemplatesPage = lazy(() => import("./pages/TemplatesPage").then((m) => ({ default: m.TemplatesPage })));
const TemplateDetailPage = lazy(() => import("./pages/TemplateDetailPage").then((m) => ({ default: m.TemplateDetailPage })));
const ServicesPage = lazy(() => import("./pages/ServicesPage").then((m) => ({ default: m.ServicesPage })));
const AboutPage = lazy(() => import("./pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then((m) => ({ default: m.ContactPage })));
const FAQPage = lazy(() => import("./pages/FAQPage").then((m) => ({ default: m.FAQPage })));
const PrivacyPage = lazy(() => import("./pages/LegalPages").then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import("./pages/LegalPages").then((m) => ({ default: m.TermsPage })));

export default function App() {
  const [selected, setSelected] = useState(null);
  const showTop = useScrollTop();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Derive "page" from location for animations and SEO
  const getPageKey = (pathname) => {
    if (pathname === "/") return "home";
    if (pathname.startsWith("/templates")) return pathname.includes("/templates/") ? "detail" : "templates";
    return pathname.substring(1);
  };
  
  const page = getPageKey(location.pathname);

  useSmoothScroll();
  useGsapSiteAnimations(page);

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 900,
      easing: "ease-out-cubic",
      offset: 80,
    });

    const onLoad = () => AOS.refreshHard();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // SEO Management
  useEffect(() => {
    const titles = {
      home: "Free Website Templates & Custom Web Development | Shahriar Themes",
      templates: "Browse Free React & HTML Templates | Shahriar Themes",
      detail: selected ? `${selected.name} | Shahriar Themes` : "Template Details | Shahriar Themes",
      services: "Professional Web Development Services & Pricing | Shahriar Themes",
      about: "About Shahriar Themes | High-Performance Web Development",
      contact: "Get a Free Project Estimate | Contact Shahriar Themes",
      faq: "Frequently Asked Questions | Shahriar Themes Support",
      privacy: "Privacy Policy | Shahriar Themes",
      terms: "Terms & Conditions | Shahriar Themes"
    };
    const descriptions = {
      home: "Download high-quality free website templates or hire a professional for custom React development. Fast, SEO-ready, and conversion-focused.",
      templates: "Explore our library of free, production-ready templates for landing pages, portfolios, and businesses. Built with React and modern tech.",
      services: "Custom web development services starting at $150. Specialized in high-performance frontend systems and Figma to HTML conversion.",
      about: "Learn about the mission behind Shahriar Themes and how we help businesses grow with better web performance.",
      contact: "Ready to start your project? Get in touch for a free estimate and analysis of your website goals.",
      faq: "Common questions about licensing, custom modifications, and project timelines.",
    };

    document.title = titles[page] || titles.home;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", descriptions[page] || descriptions.home);
    }
    
    // Smooth scroll and AOS
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0 });
    }
    requestAnimationFrame(() => AOS.refreshHard());
  }, [page, selected]);

  return (
    <>
      <header>
        <Navbar page={page} />
      </header>
      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage setSelected={setSelected}/>} />
            <Route path="/templates" element={<TemplatesPage setSelected={setSelected}/>} />
            <Route path="/templates/:id" element={<TemplateDetailPage template={selected} setSelected={setSelected}/>} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<HomePage setSelected={setSelected}/>} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <button
        className={`scroll-top ${showTop ? "visible" : ""}`}
        onClick={() => {
          if (window.lenis) {
            window.lenis.scrollTo(0);
            return;
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        aria-label="Scroll to top"
      >↑</button>
    </>
  );
}
