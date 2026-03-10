import { useState, useEffect } from "react";
import "./index.css";
import { useScrollTop } from "./hooks";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { HomePage } from "./pages/HomePage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { TemplateDetailPage } from "./pages/TemplateDetailPage";
import { ServicesPage } from "./pages/ServicesPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { FAQPage } from "./pages/FAQPage";
import { PrivacyPage, TermsPage } from "./pages/LegalPages";

export default function App() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);
  const showTop = useScrollTop();

  // Re-run animations on page change
  useEffect(() => { window.scrollTo({ top: 0 }); }, [page]);

  const renderPage = () => {
    switch (page) {
      case "home":      return <HomePage setPage={setPage} setSelected={setSelected}/>;
      case "templates": return <TemplatesPage setPage={setPage} setSelected={setSelected}/>;
      case "detail":    return selected ? <TemplateDetailPage template={selected} setPage={setPage} setSelected={setSelected}/> : <TemplatesPage setPage={setPage} setSelected={setSelected}/>;
      case "services":  return <ServicesPage setPage={setPage}/>;
      case "about":     return <AboutPage setPage={setPage}/>;
      case "contact":   return <ContactPage/>;
      case "faq":       return <FAQPage setPage={setPage}/>;
      case "privacy":   return <PrivacyPage/>;
      case "terms":     return <TermsPage/>;
      default:          return <HomePage setPage={setPage} setSelected={setSelected}/>;
    }
  };

  return (
    <>
      <header>
        <Navbar page={page} setPage={setPage}/>
      </header>
      <main>{renderPage()}</main>
      <Footer setPage={setPage}/>
      <button
        className={`scroll-top ${showTop ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
        aria-label="Scroll to top"
      >↑</button>
    </>
  );
}
