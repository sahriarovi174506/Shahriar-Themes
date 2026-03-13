import { useAnimateOnScroll } from "../hooks";

export function ServicesPage({ setPage }) {
  useAnimateOnScroll();
  const services = [
    { icon:"⚡", title:"Landing Page Development", desc:"Conversion-focused pages built with a clear user journey. A/B test ready, analytics integrated, and fully responsive.", features:["Hero + CTA","Feature sections","Testimonials","Pricing tables","Lead capture forms","A/B test structure"] },
    { icon:"🎨", title:"Portfolio Websites", desc:"Personal sites that make you stand out. Showcase projects, skills, and achievements in a memorable, branded experience.", features:["Project grid/gallery","Skills timeline","About & bio","Blog integration","Contact form","Animations"] },
    { icon:"💼", title:"Business Websites", desc:"Full multi-page business sites with CMS, SEO structure, blog, and all the content your company needs to grow online.", features:["Up to 8 pages","CMS integration","Blog system","Contact + booking","SEO foundation","Google Analytics"] },
    { icon:"⊞", title:"Figma / PSD to HTML", desc:"Pixel-perfect implementation of any design file. If you can design it, I can code it — clean, maintainable, and responsive.", features:["Pixel-perfect fidelity","Semantic HTML","Responsive breakpoints","Accessible markup","Animation layer","Developer handoff"] },
  ];
  const process = [
    { n:"01", title:"Discovery Call", desc:"We discuss your goals, audience, and requirements. I'll ask all the right questions to understand what you need." },
    { n:"02", title:"Proposal & Quote", desc:"Within 24 hours I send a detailed scope, timeline, and fixed-price quote. No hidden fees, ever." },
    { n:"03", title:"Design & Prototype", desc:"I create wireframes and a high-fidelity prototype in Figma. You review and approve before a single line of code is written." },
    { n:"04", title:"Development", desc:"Clean, commented, production-ready code. I provide staging access so you can review progress in real time." },
    { n:"05", title:"Launch & Handoff", desc:"I deploy to your host, run final QA, and hand over all source files along with a documentation guide." },
  ];
  const pricing = [
    { name:"Starter", price:"499", period:"one-time", features:["Single landing page","Up to 5 sections","Contact form","Mobile responsive","Basic SEO","1-week delivery"], featured:false },
    { name:"Professional", price:"1299", period:"one-time", features:["Up to 6 pages","CMS integration","Blog system","Contact + booking","Advanced SEO","2–3 week delivery", "30-day support"], featured:true },
    { name:"Enterprise", price:"Custom", period:"quoted", features:["Unlimited pages","Custom functionality","API integrations","E-commerce ready","Premium SEO","Priority support","Dedicated PM"], featured:false },
  ];
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="section-eyebrow animated" style={{ justifyContent:"center" }}>Services</div>
          <h1 className="fade-up animated">Custom Web Development</h1>
          <p className="fade-up delay-1 animated">Professional websites built to your exact requirements. From idea to live site, I handle everything.</p>
        </div>
      </div>
      <section style={{ paddingTop:"0" }}>
        <div className="container">
          <div className="grid-2">
            {services.map((s, i) => (
              <div key={s.title} className={`card service-card fade-up delay-${(i%2)+1} animated`} style={{ padding:"3.6rem" }}>
                <div className="service-icon">{s.icon}</div>
                <h3 style={{ fontSize:"2.2rem", marginBottom:"1.2rem" }}>{s.title}</h3>
                <p style={{ marginBottom:"2.4rem" }}>{s.desc}</p>
                <ul className="feature-list">
                  {s.features.map(f => <li key={f}>{f}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background:"var(--bg-2)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
        <div className="container">
          <div className="split-2 split-2--start split-2--gap-xl">
            <div>
              <div className="section-eyebrow fade-left animated">Process</div>
              <h2 className="section-title fade-left delay-1 animated">How we work together</h2>
              <p style={{ color:"var(--text-2)", fontSize:"1.6rem", lineHeight:"1.7", marginBottom:"4rem" }} className="fade-left delay-2 animated">A clear, transparent process so you always know what's happening with your project.</p>
              {process.map((p, i) => (
                <div key={p.n} className={`process-step fade-left delay-${(i%3)+1} animated`}>
                  <div className="process-num">{p.n}</div>
                  <div className="process-content">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ paddingTop:"4rem" }}>
              <div className="section-eyebrow fade-right animated">Pricing</div>
              <h2 className="section-title fade-right delay-1 animated">Transparent pricing</h2>
              <p style={{ color:"var(--text-2)", fontSize:"1.6rem", lineHeight:"1.7", marginBottom:"3.2rem" }} className="fade-right delay-2 animated">Fixed-price projects. No hourly billing, no surprises.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"2rem" }}>
                {pricing.map((p, i) => (
                  <div key={p.name} className={`card pricing-card fade-right delay-${i+2} animated`}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1.6rem" }}>
                      <div>
                        <div className="pricing-name" style={{ marginBottom:"0.4rem" }}>{p.name}</div>
                        <div style={{ display:"flex", alignItems:"baseline", gap:"0.4rem" }}>
                          {p.price === "Custom" ? <span style={{ fontFamily:"Syne", fontSize:"2.8rem", fontWeight:"800" }}>Custom</span> : <><span style={{ fontFamily:"Syne", fontSize:"3.2rem", fontWeight:"800" }}>${p.price}</span><span style={{ color:"var(--text-3)", fontSize:"1.3rem" }}> / {p.period}</span></>}
                        </div>
                      </div>
                      <button className={`btn ${p.featured ? "btn-primary" : "btn-secondary"} btn-sm`} onClick={() => { setPage("contact"); window.scrollTo({top:0}); }}>
                        {p.price === "Custom" ? "Get Quote" : "Get Started"}
                      </button>
                    </div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"0.8rem", marginTop:"1.6rem" }}>
                      {p.features.map(f => <span key={f} style={{ fontSize:"1.2rem", color:"var(--text-2)", background:"var(--bg-3)", padding:"0.3rem 1rem", borderRadius:"999px", border:"1px solid var(--border)" }}>✓ {f}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-section fade-up animated">
            <h2>Ready to start your project?</h2>
            <p>Let's talk about what you need. I'll have a quote in your inbox within 24 hours.</p>
            <div className="cta-actions">
              <button className="btn btn-primary btn-lg" onClick={() => { setPage("contact"); window.scrollTo({top:0}); }}>Get a Free Quote →</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
