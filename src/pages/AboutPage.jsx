import { useAnimateOnScroll } from "../hooks";
import { PROFILE } from "../data/profile";

export function AboutPage({ setPage }) {
  useAnimateOnScroll();
  const skills = [
    { name:"HTML / CSS", level:96 },{ name:"JavaScript", level:92 },
    { name:"React", level:88 },{ name:"Bootstrap 4/5", level:90 },
    { name:"Tailwind CSS", level:86 },{ name:"SCSS", level:84 },
  ];
  const stack = ["HTML","CSS","JavaScript","React","jQuery","Bootstrap","Tailwind CSS","SCSS","Figma","PSD","XD","Git"];
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="section-eyebrow animated" style={{ justifyContent:"center" }}>About</div>
          <h1 className="fade-up animated">Hi, I'm {PROFILE.name}</h1>
          <p className="fade-up delay-1 animated">{PROFILE.role} with {PROFILE.yearsExperience}+ years of professional experience building modern, responsive, high-performing websites.</p>
        </div>
      </div>
      <section style={{ paddingTop:"0" }}>
        <div className="container">
          <div className="split-2">
            <div>
              <div style={{ aspectRatio:"4/5", borderRadius:"var(--radius-lg)", overflow:"hidden", background:"var(--bg-3)", border:"1px solid var(--border)" }} className="fade-left animated">
                <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=80" alt="Developer" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
              </div>
            </div>
            <div>
              <div className="section-eyebrow fade-right animated">The Story</div>
              <h2 className="section-title fade-right delay-1 animated">Code. Design. Launch.</h2>
              <div style={{ color:"var(--text-2)", fontSize:"1.6rem", lineHeight:"1.8" }} className="fade-right delay-2 animated">
                <p style={{ marginBottom:"1.6rem" }}>I'm a passionate web developer focused on building modern, responsive, and high-performing websites that work seamlessly across devices and major browsers.</p>
                <p style={{ marginBottom:"1.6rem" }}>I have worked under a Fiverr Top Rated Seller for {PROFILE.yearsExperience} years and completed hundreds of projects - transforming Figma, PSD, and XD designs into clean, well-structured, fully functional websites.</p>
                <p>I'm also interested in Vibe Coding and AI-assisted development to improve productivity and build smarter web solutions.</p>
              </div>
              <div className="about-stats-row fade-right delay-3 animated">
                <div><strong style={{ fontFamily:"Syne", fontSize:"3.2rem", fontWeight:"800", color:"var(--accent)" }}>{PROFILE.yearsExperience}+</strong><br/><span style={{ color:"var(--text-2)", fontSize:"1.4rem" }}>Years Experience</span></div>
                <div><strong style={{ fontFamily:"Syne", fontSize:"3.2rem", fontWeight:"800", color:"var(--accent)" }}>300+</strong><br/><span style={{ color:"var(--text-2)", fontSize:"1.4rem" }}>Projects Completed</span></div>
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
          <div className="split-2 split-2--start">
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
                  "Build fast, responsive, conversion-focused web experiences - with clean code, pixel-perfect UI, and smooth interactions."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
