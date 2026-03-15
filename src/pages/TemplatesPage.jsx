import { useEffect } from "react";
import { useAnimateOnScroll, useProductSearch } from "../hooks";
import { TemplateCard } from "../components/TemplateCard";

export function TemplatesPage({ setPage, setSelected }) {
  useAnimateOnScroll();
  const cats = ["All", "Landing Page", "Portfolio", "Business", "Blog"];
  const {
    query,
    setQuery,
    filters,
    setFilters,
    results,
    loading,
    meta,
  } = useProductSearch({ initialFilters: { category: "All" }, pageSize: 12 });

  const activeCategory = filters?.category || "All";
  useEffect(() => {
    if (!cats.includes(activeCategory)) {
      setFilters((prev) => ({ ...prev, category: "All" }));
    }
  }, [activeCategory, setFilters]);

  return (
    <>
      <div className="page-header" data-parallax="16">
        <div className="container">
          <div className="section-eyebrow animated" style={{ justifyContent:"center" }}>Free Templates</div>
          <h1 className="fade-up animated">Browse All Templates</h1>
          <p className="fade-up delay-1 animated">Fully coded, free to download, ready to deploy. No sign-up required.</p>
        </div>
      </div>
      <section style={{ paddingTop:"0" }}>
        <div className="container">
          <div className="search-row fade-up animated">
            <div className="search-input-wrap">
              <input
                className="search-input"
                type="search"
                placeholder="Search templates, tech, features..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search templates"
              />
              {query && (
                <button className="search-clear" onClick={() => setQuery("")} aria-label="Clear search">
                  Clear
                </button>
              )}
            </div>
            <div className="search-meta">
              {loading ? "Searching..." : `${meta.total} result${meta.total === 1 ? "" : "s"}`}
            </div>
          </div>
          <div className="filter-row fade-up animated">
            {cats.map((c) => (
              <button
                key={c}
                className={`filter-btn ${activeCategory === c ? "active" : ""}`}
                onClick={() => setFilters((prev) => ({ ...prev, category: c }))}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid-3">
            {results.map((t, i) => (
              <div key={t.id} className={`fade-up delay-${(i % 3) + 1} animated`}>
                <TemplateCard t={t} setPage={setPage} setSelected={setSelected} />
              </div>
            ))}
          </div>
          {results.length === 0 && (
            <div style={{ textAlign:"center", padding:"6rem 0", color:"var(--text-3)" }}>
              <div style={{ fontSize:"4rem", marginBottom:"1.6rem" }}>ðŸ”</div>
              <p>No templates in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
