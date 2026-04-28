import { useMemo, useState, useEffect } from "react";
import { useAnimateOnScroll, useDownloadsApi } from "../hooks";
import { Icon } from "../components/Icon";
import { Slider } from "../components/Slider";
import { TemplateCard } from "../components/TemplateCard";
import { TEMPLATES } from "../data/templates";
import { scrollToTop } from "../utils/scroll";

export function TemplateDetailPage({ template, setPage, setSelected }) {
  useAnimateOnScroll();
  const [activeImg, setActiveImg] = useState(0);
  const { count, download, clicked } = useDownloadsApi(template.id, template.downloads, template.repoUrl);
  const related = useMemo(
    () => TEMPLATES.filter((t) => t.id !== template.id && t.category === template.category).slice(0, 3),
    [template.id, template.category]
  );

  // SEO Management for Detail Page
  useEffect(() => {
    document.title = `${template.name} - Free ${template.category} Template | Shahriar Themes`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", `Download the ${template.name} ${template.category} template for free. ${template.desc} Built with ${template.tech.join(", ")}.`);
    }

    // Inject JSON-LD
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "json-ld-template";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": template.name,
      "operatingSystem": "Web",
      "applicationCategory": "DeveloperApplication",
      "description": template.desc,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    });
    document.head.appendChild(script);

    return () => {
      const oldScript = document.getElementById("json-ld-template");
      if (oldScript) oldScript.remove();
    };
  }, [template]);
  return (
    <>
      <div style={{ paddingTop:"8rem" }}>
        <section className="detail-hero">
          <div className="container">
            <div style={{ marginBottom:"2rem" }}>
              <button className="btn btn-ghost btn-sm" onClick={() => { setPage("templates"); scrollToTop({ immediate: true }); }}>← Back to Templates</button>
            </div>
            <div className="split-2 split-2--detail">
              <div>
                <div className="detail-preview fade-up animated" data-parallax="12">
                  <img
                    src={template.images[activeImg] || template.images[0]}
                    alt={template.name}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
                <div className="detail-thumbnails fade-up delay-1 animated">
                  {template.images.map((img, i) => (
                    <div key={i} className={`thumb ${activeImg === i ? "active" : ""}`} onClick={() => setActiveImg(i)}>
                      <img src={img} alt={`${template.name} preview ${i + 1}`} loading="lazy" decoding="async" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="detail-sidebar fade-right animated" data-parallax="10">
                <div className="detail-sidebar-card">
                  <span className="badge badge-accent" style={{ marginBottom:"1.6rem" }}>{template.category}</span>
                  <h1 style={{ fontSize:"3.2rem", marginBottom:"1.2rem" }}>{template.name}</h1>
                  <p style={{ color:"var(--text-2)", fontSize:"1.5rem", lineHeight:"1.7", marginBottom:"2.4rem" }}>{template.desc}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:"1.2rem", marginBottom:"2.4rem" }}>
                    <span className="download-count" style={{ fontSize:"1.5rem" }}><Icon name="download"/> {count.toLocaleString()} downloads</span>
                  </div>
                  <button className={`btn btn-primary btn-lg`} style={{ width:"100%", marginBottom:"1.2rem", justifyContent:"center" }} onClick={download}>
                    <Icon name="download"/> {clicked ? "✓ Downloaded!" : "Free Download"}
                  </button>
                  <a href={template.previewUrl} className="btn btn-secondary" style={{ width:"100%", justifyContent:"center" }}>
                    <Icon name="eye"/> Live Preview ↗
                  </a>
                  <hr style={{ border:"none", borderTop:"1px solid var(--border)", margin:"2.4rem 0" }}/>
                  <h4 style={{ fontSize:"1.4rem", fontWeight:"700", marginBottom:"1.2rem", color:"var(--text-2)", textTransform:"uppercase", letterSpacing:"0.1em" }}>Technologies</h4>
                  <div className="tech-tags">
                    {template.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                  <hr style={{ border:"none", borderTop:"1px solid var(--border)", margin:"2.4rem 0" }}/>
                  <h4 style={{ fontSize:"1.4rem", fontWeight:"700", marginBottom:"1.2rem", color:"var(--text-2)", textTransform:"uppercase", letterSpacing:"0.1em" }}>Features</h4>
                  <ul className="feature-list">
                    {template.features.map(f => <li key={f}>{f}</li>)}
                  </ul>
                  <hr style={{ border:"none", borderTop:"1px solid var(--border)", margin:"2.4rem 0" }}/>
                  <p style={{ fontSize:"1.3rem", color:"var(--text-3)", textAlign:"center" }}>
                    Need customisation? <button style={{ background:"none", border:"none", color:"var(--accent)", fontSize:"1.3rem", cursor:"pointer", fontWeight:"600" }} onClick={() => { setPage("contact"); scrollToTop({ immediate: true }); }}>Contact me →</button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section style={{ background:"var(--bg-2)", borderTop:"1px solid var(--border)" }}>
            <div className="container">
              <h2 style={{ fontSize:"2.8rem", marginBottom:"3.6rem" }} className="fade-up animated">Related Templates</h2>
              <Slider perView={3} gap={24}>
                {related.map(t => <TemplateCard key={t.id} t={t} setPage={setPage} setSelected={setSelected}/>)}
              </Slider>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
