export function Footer({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo({ top: 0 }); };
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="navbar-logo" style={{ marginBottom:"1.6rem" }}>
              <span style={{ color:"var(--accent)" }}>✦</span> Shahriar<span>Themes</span>
            </div>
            <p>Free premium website templates and custom web development by Shahriar. Build something remarkable.</p>
            <div style={{ display:"flex", gap:"1rem", marginTop:"2rem" }}>
              {["GH","TW","LI","DR"].map(s => (
                <div key={s} style={{ width:"3.6rem",height:"3.6rem",borderRadius:"50%",background:"var(--bg-3)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",fontWeight:"700",color:"var(--text-2)",cursor:"pointer" }}>{s}</div>
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
          <span>© 2025 Shahriar Themes. Crafted with ✦ by Shahriar.</span>
          <span>All templates free forever.</span>
        </div>
      </div>
    </footer>
  );
}
