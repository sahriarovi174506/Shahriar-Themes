import { useState } from "react";
import { useScrolled } from "../hooks";

export function Navbar({ page, setPage }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const nav = [
    ["Home","home"],["Templates","templates"],["Services","services"],
    ["About","about"],["Contact","contact"],
  ];
  const go = (p) => { setPage(p); setOpen(false); window.scrollTo({ top: 0 }); };
  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="navbar-inner">
            <div className="navbar-logo" style={{ cursor:"pointer" }} onClick={() => go("home")}>
              <span style={{ color:"var(--accent)" }}>✦</span> Shahriar<span>Themes</span>
            </div>
            <ul className="navbar-links">
              {nav.map(([label, key]) => (
                <li key={key}>
                  <a className={page === key ? "active" : ""} onClick={() => go(key)} style={{ cursor:"pointer" }}>{label}</a>
                </li>
              ))}
            </ul>
            <div className="navbar-cta">
              <button className="btn btn-ghost btn-sm" onClick={() => go("templates")}>Browse Templates</button>
              <button className="btn btn-primary btn-sm" onClick={() => go("contact")}>Hire Me</button>
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
        {nav.map(([label, key]) => (
          <a key={key} onClick={() => go(key)} style={{ cursor:"pointer" }}>{label}</a>
        ))}
        <button className="btn btn-primary btn-lg" onClick={() => go("contact")}>Hire Me →</button>
      </div>
    </>
  );
}
