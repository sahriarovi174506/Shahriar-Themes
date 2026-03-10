import { useState } from "react";
import { useAnimateOnScroll } from "../hooks";
import { TemplateCard } from "../components/TemplateCard";
import { TEMPLATES } from "../data/templates";

export function TemplatesPage({ setPage, setSelected }) {
  useAnimateOnScroll();
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Landing Page", "Portfolio", "Business", "Blog"];
  const visible = filter === "All" ? TEMPLATES : TEMPLATES.filter(t => t.category === filter);
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="section-eyebrow animated" style={{ justifyContent:"center" }}>Free Templates</div>
          <h1 className="fade-up animated">Browse All Templates</h1>
          <p className="fade-up delay-1 animated">Fully coded, free to download, ready to deploy. No sign-up required.</p>
        </div>
      </div>
      <section style={{ paddingTop:"0" }}>
        <div className="container">
          <div className="filter-row fade-up animated">
            {cats.map(c => (
              <button key={c} className={`filter-btn ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>
          <div className="grid-3">
            {visible.map((t, i) => (
              <div key={t.id} className={`fade-up delay-${(i%3)+1} animated`}>
                <TemplateCard t={t} setPage={setPage} setSelected={setSelected}/>
              </div>
            ))}
          </div>
          {visible.length === 0 && (
            <div style={{ textAlign:"center", padding:"6rem 0", color:"var(--text-3)" }}>
              <div style={{ fontSize:"4rem", marginBottom:"1.6rem" }}>🔍</div>
              <p>No templates in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
