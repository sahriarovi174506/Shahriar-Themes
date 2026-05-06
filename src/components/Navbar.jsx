import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../utils/scroll";
import { useScrolled } from "../hooks";

export function Navbar({ page }) {
  const scrolled = useScrolled();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const nav = [
    ["Home","/"],["Templates","/templates"],["Services","/services"],
    ["About","/about"],["Contact","/contact"],
  ];
  
  const go = (path) => { 
    navigate(path); 
    setOpen(false); 
    scrollToTop({ immediate: true }); 
  };

  const isActive = (path) => {
    if (path === "/" && page === "home") return true;
    if (path === "/templates" && (page === "templates" || page === "detail")) return true;
    return page === path.substring(1);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="navbar-inner">
            <div className="navbar-logo" style={{ cursor:"pointer" }} onClick={() => go("/")}>
              <span style={{ color:"var(--accent)" }}>✦</span> Shahriar<span>Themes</span>
            </div>
            <ul className="navbar-links">
              {nav.map(([label, path]) => (
                <li key={path}>
                  <a className={isActive(path) ? "active" : ""} onClick={() => go(path)} style={{ cursor:"pointer" }}>{label}</a>
                </li>
              ))}
            </ul>
            <div className="navbar-cta">
              <button className="btn btn-ghost btn-sm" onClick={() => go("/templates")}>Browse Templates</button>
              <button className="btn btn-primary btn-sm" onClick={() => go("/contact")}>Get a Quote</button>
            </div>
            <button
              className={`hamburger ${open ? "open" : ""}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(o => !o)}
            >
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {/* Close via hamburger/cross */}
        {nav.map(([label, path]) => (
          <a key={path} onClick={() => go(path)} style={{ cursor:"pointer" }}>{label}</a>
        ))}
        <button className="btn btn-primary btn-lg" onClick={() => go("/contact")}>Get a Quote →</button>
      </div>
    </>
  );
}
