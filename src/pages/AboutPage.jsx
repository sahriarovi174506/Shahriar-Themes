import { useAnimateOnScroll } from "../hooks";

export function AboutPage({ setPage }) {
  useAnimateOnScroll();
  const skills = [
    { name:"React / Next.js", level:95 },{ name:"Node.js / Express", level:88 },
    { name:"TypeScript", level:85 },{ name:"UI/UX Design", level:80 },
    { name:"MongoDB / PostgreSQL", level:82 },{ name:"DevOps / AWS", level:72 },
  ];
  const stack = ["React","Next.js","Node.js","TypeScript","MongoDB","PostgreSQL","Tailwind CSS","Figma","AWS","Docker","Git","Vercel"];
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="section-eyebrow animated" style={{ justifyContent:"center" }}>About</div>
          <h1 className="fade-up animated">Hi, I'm Alex Chen</h1>
          <p className="fade-up delay-1 animated">Full-stack developer with 7 years of experience building web products that people actually enjoy using.</p>
        </div>
      </div>
      <section style={{ paddingTop:"0" }}>
        <div className="container">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6rem", alignItems:"center" }}>
            <div>
              <div style={{ aspectRatio:"4/5", borderRadius:"var(--radius-lg)", overflow:"hidden", background:"var(--bg-3)", border:"1px solid var(--border)" }} className="fade-left animated">
                <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=80" alt="Developer" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
              </div>
            </div>
            <div>
              <div className="section-eyebrow fade-right animated">The Story</div>
              <h2 className="section-title fade-right delay-1 animated">Code. Design. Launch.</h2>
              <div style={{ color:"var(--text-2)", fontSize:"1.6rem", lineHeight:"1.8" }} className="fade-right delay-2 animated">
                <p style={{ marginBottom:"1.6rem" }}>I started building websites at 17 with nothing but a pirated copy of Dreamweaver and too much free time. Today I help startups, agencies, and solo founders turn their ideas into fast, beautiful web experiences.</p>
                <p style={{ marginBottom:"1.6rem" }}>This site started as a way to give back — I wanted to create the templates I wished existed when I was starting out. Every template is built to the same standard as client work: clean code, responsive layouts, and no-nonsense architecture.</p>
                <p>When I'm not writing code, I'm probably writing about it. You can find my articles on dev.to and my open-source work on GitHub.</p>
              </div>
              <div style={{ display:"flex", gap:"2.4rem", margin:"3.2rem 0" }} className="fade-right delay-3 animated">
                <div><strong style={{ fontFamily:"Syne", fontSize:"3.2rem", fontWeight:"800", color:"var(--accent)" }}>7+</strong><br/><span style={{ color:"var(--text-2)", fontSize:"1.4rem" }}>Years Experience</span></div>
                <div><strong style={{ fontFamily:"Syne", fontSize:"3.2rem", fontWeight:"800", color:"var(--accent)" }}>120+</strong><br/><span style={{ color:"var(--text-2)", fontSize:"1.4rem" }}>Projects Delivered</span></div>
                <div><strong style={{ fontFamily:"Syne", fontSize:"3.2rem", fontWeight:"800", color:"var(--accent)" }}>48</strong><br/><span style={{ color:"var(--text-2)", fontSize:"1.4rem" }}>Free Templates</span></div>
              </div>
              <button className="btn btn-primary fade-right delay-4 animated" onClick={() => { setPage("contact"); window.scrollTo({top:0}); }}>
                Let's Work Together →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background:"var(--bg-2)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6rem" }}>
            <div>
              <div className="section-eyebrow fade-left animated">Skills</div>
              <h2 style={{ fontSize:"3.2rem", marginBottom:"3.2rem" }} className="fade-left delay-1 animated">Technical Expertise</h2>
              {skills.map((s, i) => (
                <div key={s.name} className={`skill-bar-wrap fade-left delay-${(i%3)+1} animated`}>
                  <div className="skill-bar-label"><span>{s.name}</span><span>{s.level}%</span></div>
                  <div className="skill-bar"><div className="skill-bar-fill" style={{ width:`${s.level}%` }}/></div>
                </div>
              ))}
            </div>
            <div>
              <div className="section-eyebrow fade-right animated">Stack</div>
              <h2 style={{ fontSize:"3.2rem", marginBottom:"3.2rem" }} className="fade-right delay-1 animated">Tools I Love</h2>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"1rem" }} className="fade-right delay-2 animated">
                {stack.map(t => (
                  <span key={t} style={{ padding:"0.8rem 1.8rem", background:"var(--bg-3)", border:"1px solid var(--border)", borderRadius:"var(--radius-sm)", fontSize:"1.4rem", fontFamily:"'JetBrains Mono', monospace", color:"var(--text-2)" }}>{t}</span>
                ))}
              </div>
              <div style={{ marginTop:"4rem", padding:"3.2rem", background:"var(--bg-3)", border:"1px solid var(--border)", borderRadius:"var(--radius-md)" }} className="fade-right delay-3 animated">
                <h3 style={{ fontSize:"2rem", marginBottom:"1.2rem" }}>My Mission</h3>
                <p style={{ color:"var(--text-2)", fontSize:"1.5rem", lineHeight:"1.7" }}>
                  "To make the web more accessible by giving developers free, production-quality starting points — and to help founders build digital products they're proud of."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
