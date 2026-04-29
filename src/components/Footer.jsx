import { PROFILE } from "../data/profile";
import { scrollToTop } from "../utils/scroll";
import { Icon } from "./Icon";

export function Footer({ setPage }) {
  const go = (p) => { setPage(p); scrollToTop({ immediate: true }); };
  const year = new Date().getFullYear();
  const socials = [
    { label: "GitHub", icon: "github", href: PROFILE.githubUrl },
    { label: "Facebook", icon: "facebook", href: PROFILE.facebookUrl },
    { label: "WhatsApp", icon: "whatsapp", href: PROFILE.whatsappUrl },
  ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="navbar-logo" style={{ marginBottom:"1.6rem" }}>
              <span style={{ color:"var(--accent)" }}>✦</span> Shahriar<span>Themes</span>
            </div>
            <p>Free premium website templates and custom web development by {PROFILE.name}.</p>
            <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginTop:"1.2rem", fontSize:"1.2rem", color:"var(--accent)", fontWeight:"700" }}>
              <span className="pulse" style={{ width:"6px", height:"6px", background:"var(--accent)", borderRadius:"50%" }}></span>
              Available: {PROFILE.availability.slotsRemaining} slots in {PROFILE.availability.currentMonth}
            </div>
            <div style={{ display:"flex", gap:"1rem", marginTop:"2rem" }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel={s.href.startsWith("http") ? "noreferrer" : undefined} aria-label={s.label} title={s.label} style={{ width:"3.6rem",height:"3.6rem",borderRadius:"50%",background:"var(--bg-3)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.6rem",color:"var(--text-2)",cursor:"pointer" }}>
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4>Pages</h4>
            <ul>
              {[["Home","home"],["Templates","templates"],["Services","services"],["About","about"],["Contact","contact"],["FAQ","faq"]].map(([l,p]) => (
                <li key={p}><a onClick={() => go(p)} style={{ cursor:"pointer" }}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Templates</h4>
            <ul>
              {["Landing Pages","Portfolio Sites","Business Sites","Blog Templates","E-commerce","Coming Soon"].map(c => (
                <li key={c}><a onClick={() => go("templates")} style={{ cursor:"pointer" }}>{c}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              {[["Privacy Policy","privacy"],["Terms & Conditions","terms"],["Licence Info","terms"]].map(([l,p]) => (
                <li key={l}><a onClick={() => go(p)} style={{ cursor:"pointer" }}>{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} Shahriar Themes. Crafted with ✦ by {PROFILE.name}.</span>
          <span>All templates free forever.</span>
        </div>
      </div>
    </footer>
  );
}
