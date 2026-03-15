import { useState, useEffect } from "react";
import { useAnimateOnScroll } from "../hooks";
import { Slider } from "../components/Slider";
import { TemplateCard } from "../components/TemplateCard";
import { AnimCount } from "../components/AnimCount";
import { TEMPLATES } from "../data/templates";
import { TESTIMONIALS } from "../data/siteData";
import { apiUrl } from "../config";

export function HomePage({ setPage, setSelected }) {
  useAnimateOnScroll();

  // Live site stats from backend
  const [stats, setStats] = useState({ totalTemplates: 48, totalDownloads: 7800, happyClients: 120, avgRating: 5 });
  useEffect(() => {
    fetch(apiUrl(`/api/stats`))
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setStats(data); })
      .catch(() => {});
  }, []);
  const services = [
    { icon:"⚡", title:"Landing Pages", desc:"High-converting pages built to turn visitors into customers.", badge:"badge-accent" },
    { icon:"🎨", title:"Portfolio Sites", desc:"Showcase your work with a beautifully crafted personal site.", badge:"badge-purple" },
    { icon:"💼", title:"Business Websites", desc:"Professional multi-page sites with CMS and contact systems.", badge:"badge-pink" },
    { icon:"⊞", title:"PSD / Figma to HTML", desc:"Pixel-perfect conversion of any design file to clean code.", badge:"badge-accent" },
  ];
  const whys = [
    { n:"01", title:"Clean, Commented Code", desc:"Every line is readable, maintainable, and production-ready." },
    { n:"02", title:"Performance First", desc:"Optimised images, lazy loading, and 95+ Lighthouse scores." },
    { n:"03", title:"Fully Responsive", desc:"Looks perfect on every device, from watch to 4K monitor." },
    { n:"04", title:"Fast Turnaround", desc:"Landing pages in 5 days, full sites in 2–4 weeks. Always." },
    { n:"05", title:"Post-Launch Support", desc:"30 days of free bug-fix support after every project delivery." },
    { n:"06", title:"Free Templates Forever", desc:"All community templates stay free. No paywalls, ever." },
  ];
  return (
    <>
      {/* Hero */}
      <section className="hero noise">
        <div className="hero-bg" data-parallax="50"/>
        <div className="hero-grid-lines" data-parallax="-25"/>
        <div className="container">
          <div className="hero-content" data-parallax="18">
            <div className="hero-eyebrow fade-up animated"><span>✦</span> Free Templates & Custom Dev</div>
            <h1 className="hero-title fade-up delay-1 animated">
              Build sites that<br/><span className="highlight">actually convert</span>
            </h1>
            <p className="hero-desc fade-up delay-2 animated">
              Download free professional website templates or commission a custom site built to your exact brief. Clean code. No shortcuts.
            </p>
            <div className="hero-actions fade-up delay-3 animated">
              <button className="btn btn-primary btn-lg" onClick={() => { setPage("templates"); window.scrollTo({top:0}); }}>
                Browse Free Templates →
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => { setPage("contact"); window.scrollTo({top:0}); }}>
                Hire Me
              </button>
            </div>
            <div className="hero-stats fade-up delay-4 animated">
              <div className="hero-stat"><strong><AnimCount target={stats.totalTemplates}/></strong><span>Free Templates</span></div>
              <div className="hero-stat"><strong><AnimCount target={stats.totalDownloads} suffix=""/></strong><span>Downloads</span></div>
              <div className="hero-stat"><strong><AnimCount target={stats.happyClients} suffix=""/></strong><span>Happy Clients</span></div>
              <div className="hero-stat"><strong><AnimCount target={stats.avgRating} suffix=""/></strong><span>Avg. Rating</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section style={{ background:"var(--bg-2)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
        <div className="container">
          <div className="section-head-row">
            <div>
              <div className="section-eyebrow fade-left animated">Featured Templates</div>
              <h2 className="section-title fade-left delay-1 animated">Download & Deploy Today</h2>
              <p className="section-subtitle fade-left delay-2 animated">Handcrafted, free, production-ready templates for every type of website.</p>
            </div>
            <button className="btn btn-secondary fade-right animated" onClick={() => { setPage("templates"); window.scrollTo({top:0}); }}>
              View All →
            </button>
          </div>
          <div className="fade-up delay-2 animated">
            <Slider perView={3} gap={24}>
              {TEMPLATES.map(t => <TemplateCard key={t.id} t={t} setPage={setPage} setSelected={setSelected}/>)}
            </Slider>
          </div>
        </div>
      </section>

      {/* Global Impact */}
      <section className="impact-section noise">
        <div className="impact-bg" data-parallax="35" />
        <div className="container">
          <div className="impact-content" data-parallax="12">
            <div className="section-eyebrow fade-up animated" style={{ justifyContent: "center", marginBottom: "2rem" }}>Trust & Community</div>
            <h2 className="section-title fade-up delay-1 animated" style={{ marginBottom: "1rem" }}>Building for the Web, Together</h2>
            <div className="impact-stat fade-up delay-2 animated">
              <div className="impact-number">
                <AnimCount target={stats.totalDownloads} />
              </div>
              <div className="impact-label">Total Downloads</div>
            </div>
            <p className="impact-desc fade-up delay-3 animated">
              Providing modern, accessible, and fast web templates to developers and creators worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section>
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:"6rem" }}>
            <div className="section-eyebrow fade-up animated" style={{ justifyContent:"center" }}>Services</div>
            <h2 className="section-title fade-up delay-1 animated">What I Build For You</h2>
            <p className="section-subtitle fade-up delay-2 animated" style={{ margin:"0 auto" }}>From quick landing pages to complex business platforms — scoped, quoted, and delivered.</p>
          </div>
          <div className="grid-4">
            {services.map((s, i) => (
              <div key={s.title} className={`card service-card fade-up delay-${i+1} animated`}>
                <div className="service-icon" style={{ fontSize:"2.4rem" }}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <button className="btn btn-ghost btn-sm" style={{ marginTop:"2rem" }} onClick={() => { setPage("services"); window.scrollTo({top:0}); }}>Learn More →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section style={{ background:"var(--bg-2)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
        <div className="container">
          <div className="whyChooseMe_row">
            <div>
              <div className="section-eyebrow fade-left animated">Why Choose Me</div>
              <h2 className="section-title fade-left delay-1 animated">Code you can actually trust</h2>
              <p style={{ color:"var(--text-2)", fontSize:"1.6rem", lineHeight:"1.7", marginBottom:"3.2rem" }} className="fade-left delay-2 animated">
                I've worked under a Fiverr Top Rated Seller for 3 years and completed hundreds of projects. Every project gets the same obsessive attention to detail.
              </p>
              <button className="btn btn-primary fade-left delay-3 animated" onClick={() => { setPage("about"); window.scrollTo({top:0}); }}>
                About Me →
              </button>
            </div>
            <div>
              {whys.map((w, i) => (
                <div key={w.n} className={`why-item fade-right delay-${i%3+1} animated`}>
                  <div className="why-num">{w.n}</div>
                  <div className="why-content">
                    <h3>{w.title}</h3>
                    <p>{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:"6rem" }}>
            <div className="section-eyebrow fade-up animated" style={{ justifyContent:"center" }}>Testimonials</div>
            <h2 className="section-title fade-up delay-1 animated">Loved by developers & founders</h2>
          </div>
          <div className="fade-up delay-2 animated">
            <Slider perView={2} gap={24} auto={true}>
              {TESTIMONIALS.map(t => (
                <div key={t.id} className="card testimonial-card">
                  <div className="testimonial-stars">{Array(t.rating).fill(0).map((_,i) => <span key={i} className="star">★</span>)}</div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{t.initials}</div>
                    <div><div className="testimonial-name">{t.name}</div><div className="testimonial-role">{t.role}</div></div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingTop:"0" }}>
        <div className="container">
          <div className="cta-section fade-up animated">
            <div className="section-eyebrow animated" style={{ justifyContent:"center" }}>Ready to build?</div>
            <h2>Start with a free template<br/>or go fully custom</h2>
            <p>Either way, you'll walk away with a site that looks great, loads fast, and converts visitors into customers.</p>
            <div className="cta-actions">
              <button className="btn btn-primary btn-lg" onClick={() => { setPage("templates"); window.scrollTo({top:0}); }}>Browse Free Templates</button>
              <button className="btn btn-secondary btn-lg" onClick={() => { setPage("contact"); window.scrollTo({top:0}); }}>Get a Custom Quote</button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
