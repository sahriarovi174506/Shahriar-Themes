import { useState, useEffect, useCallback } from "react";
import { apiUrl } from "../config";

export function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return scrolled;
}

export function useScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return show;
}

export function useAnimateOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up,.fade-down,.fade-left,.fade-right");
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("animated"); }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });
}

export function useSlider(total, auto = false, interval = 4000) {
  const [idx, setIdx] = useState(0);
  const prev = useCallback(() => setIdx(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIdx(i => (i + 1) % total), [total]);
  const go = useCallback((i) => setIdx(i), []);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [auto, interval, next]);
  return { idx, prev, next, go };
}

export function useDownloads(initial, repoUrl) {
  const [count, setCount] = useState(initial);
  const [clicked, setClicked] = useState(false);
  const download = () => {
    if (clicked) return;
    setClicked(true);
    setCount(c => c + 1);

    // Trigger actual download from GitHub
    if (repoUrl) {
      const zipUrl = `${repoUrl.replace(/\.git$/, "")}/archive/refs/heads/main.zip`;
      const link = document.createElement("a");
      link.href = zipUrl;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return { count, download, clicked };
}

// API-connected version — fetches live count and posts to backend on click
export function useDownloadsApi(templateId, initialCount, repoUrl) {
  const [count, setCount] = useState(initialCount);
  const [clicked, setClicked] = useState(false);
  const [loadedFor, setLoadedFor] = useState(null);
  const loading = Boolean(templateId) && loadedFor !== templateId;

  useEffect(() => {
    if (!templateId) return;

    let active = true;
    fetch(apiUrl(`/api/downloads/${templateId}`))
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!active) return;
        if (data) setCount(data.count);
      })
      .catch(() => { })
      .finally(() => {
        if (!active) return;
        setLoadedFor(templateId);
      });

    return () => { active = false; };
  }, [templateId]);

  const download = async () => {
    if (clicked) return;
    setClicked(true);

    // OPTIMISTIC UPDATE: Increment immediately on the screen
    setCount(c => c + 1);

    // Trigger GitHub zip download
    if (repoUrl) {
      const cleanRepoUrl = repoUrl.replace(/\.git$/, "");
      const zipUrl = `${cleanRepoUrl}/archive/refs/heads/main.zip`;
      const link = document.createElement("a");
      link.href = zipUrl;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // Update count on server
    if (templateId) {
      try {
        const res = await fetch(apiUrl(`/api/downloads/${templateId}`), { method: "POST" });
        if (res.ok) {
          const data = await res.json();
          // ONLY update if the server actually saved it (not a fallback)
          if (data && data.count !== undefined && !data.isFallback) {
            setCount(data.count);
          }
        }
      } catch (err) {
        console.error("Failed to update download count on server:", err);
      }
    }
  };

  return { count, download, clicked, loading };
}
