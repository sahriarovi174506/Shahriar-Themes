import { useState } from "react";
import { useAnimateOnScroll } from "../hooks";
import { FAQS } from "../data/siteData";

export function FAQPage({ setPage }) {
  useAnimateOnScroll();
  const [open, setOpen] = useState(null);
  return (
    <>
      <div className="page-header" data-parallax="16">
        <div className="container">
          <div className="section-eyebrow animated" style={{ justifyContent:"center" }}>FAQ</div>
          <h1 className="fade-up animated">Frequently Asked Questions</h1>
          <p className="fade-up delay-1 animated">Everything you need to know about the templates and custom development services.</p>
        </div>
      </div>
      <section style={{ paddingTop:"0" }}>
        <div className="container">
          <div style={{ maxWidth:"80rem", margin:"0 auto" }}>
            {FAQS.map((f, i) => (
              <div key={i} className={`faq-item ${open === i ? "open" : ""} fade-up delay-${(i%4)+1} animated`}>
                <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                  {f.q}
                  <div className="faq-icon">+</div>
                </button>
                <div className="faq-answer"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:"6rem" }} className="fade-up animated" data-parallax="10">
            <p style={{ color:"var(--text-2)", marginBottom:"2rem", fontSize:"1.6rem" }}>Still have questions?</p>
            <button className="btn btn-primary btn-lg" onClick={() => { setPage("contact"); window.scrollTo({top:0}); }}>Get in Touch →</button>
          </div>
        </div>
      </section>
    </>
  );
}
