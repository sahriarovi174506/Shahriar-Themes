import { useEffect, useState } from "react";
import { useAnimateOnScroll } from "../hooks";
import { apiUrl } from "../config";
import { PROFILE } from "../data/profile";

export function ContactPage() {
  useAnimateOnScroll();
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const set = (k, v) => setForm(f => ({ ...f, [k]:v }));

  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(() => setStatus("idle"), 8000);
    return () => clearTimeout(t);
  }, [status]);

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(apiUrl(`/api/contact`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name:"", email:"", subject:"", message:"" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const contactInfo = [
    { icon:"✉", title:"Email", val: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon:"💬", title:"WhatsApp", val: PROFILE.whatsapp, href: PROFILE.whatsappUrl },
    { icon:"👤", title:"Facebook", val:"facebook.com/profile.php?id=61585204776541", href: PROFILE.facebookUrl },
    { icon:"💻", title:"GitHub", val:"github.com/sahriarovi174506", href: PROFILE.githubUrl },
  ];
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="section-eyebrow animated" style={{ justifyContent:"center" }}>Contact</div>
          <h1 className="fade-up animated">Let's Work Together</h1>
          <p className="fade-up delay-1 animated">Tell me about your project. I'll get back to you with a quote within 24 hours.</p>
        </div>
      </div>
      <section style={{ paddingTop:"0" }}>
        <div className="container">
          <div className="split-2 split-2--contact">
            <div>
              <div className="section-eyebrow fade-left animated">Get in Touch</div>
              <h2 style={{ fontSize:"3.2rem", marginBottom:"1.6rem" }} className="fade-left delay-1 animated">Ready to build something great?</h2>
              <p style={{ color:"var(--text-2)", fontSize:"1.6rem", lineHeight:"1.7", marginBottom:"4rem" }} className="fade-left delay-2 animated">Whether you need a landing page, a full business site, or just want to customize a template — I'm here to help.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"1.6rem" }}>
                {contactInfo.map((c, i) => (
                  <div key={c.title} className={`contact-info-item fade-left delay-${i+2} animated`}>
                    <div className="contact-icon">{c.icon}</div>
                    <div>
                      <h4>{c.title}</h4>
                      <p>
                        {c.href ? (
                          <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noreferrer" : undefined}>
                            {c.val}
                          </a>
                        ) : (
                          c.val
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="fade-right animated">
              {status === "error" && (
                <div className="form-success" style={{ borderColor:"#ff5e78" }}>
                  <div style={{ fontSize:"3rem", marginBottom:"1.6rem" }}>✕</div>
                  <h3 style={{ fontSize:"2.4rem", marginBottom:"1rem" }}>Failed to Send</h3>
                  <p style={{ color: "var(--text-2)", fontSize: "1.5rem" }}>Something went wrong. Please try again or email us directly at {PROFILE.email}.</p>
                  <button className="btn btn-primary" style={{ marginTop:"2.4rem" }} onClick={() => setStatus("idle")}>Try Again →</button>
                </div>
              )}
              {status === "success" && (
                <div className="form-success">
                  <div style={{ fontSize:"3rem", marginBottom:"1.6rem" }}>âœ“</div>
                  <h3 style={{ fontSize:"2.4rem", marginBottom:"1rem" }}>Message Sent</h3>
                  <p style={{ color: "var(--text-2)", fontSize: "1.5rem" }}>
                    Thanks! I'll get back to you within 24 hours. This will reset shortly.
                  </p>
                  <button className="btn btn-primary" style={{ marginTop:"2.4rem" }} onClick={() => setStatus("idle")}>Send Another â†’</button>
                </div>
              )}
              {(status === "idle" || status === "loading") && (
                <form onSubmit={submit} style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:"var(--radius-md)", padding:"3.6rem" }}>
                  <h3 style={{ fontSize:"2.2rem", marginBottom:"2.8rem" }}>Send a Message</h3>
                  <div className="grid-2" style={{ gap:"1.6rem" }}>
                    <div className="form-group" style={{ marginBottom:"0" }}>
                      <label>Name *</label>
                      <input required type="text" placeholder="Your full name" value={form.name} onChange={e => set("name", e.target.value)}/>
                    </div>
                    <div className="form-group" style={{ marginBottom:"0" }}>
                      <label>Email *</label>
                      <input required type="email" placeholder="your@email.com" value={form.email} onChange={e => set("email", e.target.value)}/>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginTop:"1.6rem" }}>
                    <label>Subject</label>
                    <input type="text" placeholder="What's this about?" value={form.subject} onChange={e => set("subject", e.target.value)}/>
                  </div>
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea required placeholder="Tell me about your project — the more detail, the better..." value={form.message} onChange={e => set("message", e.target.value)}/>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" style={{ width:"100%", justifyContent:"center" }} disabled={status === "loading"}>
                    {status === "loading" ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
