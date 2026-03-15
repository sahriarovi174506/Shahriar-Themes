import { useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { apiUrl } from "../config";
import { TEMPLATES } from "../data/templates";
import { SITE_INDEX } from "../data/siteSearch";
import { searchProductsLocal, searchSiteLocal } from "../utils/search";

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

export function useSmoothScroll(dep) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      smoothWheel: true,
      smoothTouch: false,
      lerp: 0.08,
      wheelMultiplier: 0.9,
    });

    document.documentElement.classList.add("lenis");
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, [dep]);
}

export function useGsapSiteAnimations(dep) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    document.body.classList.add("gsap-active");

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray("section");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      const parallaxTargets = gsap.utils.toArray("[data-parallax]");
      parallaxTargets.forEach((el) => {
        const raw = Number(el.getAttribute("data-parallax"));
        const distance = Number.isFinite(raw) ? raw : 40;
        gsap.to(el, {
          y: distance,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });
    });

    ScrollTrigger.refresh(true);

    return () => {
      ctx.revert();
      ScrollTrigger.clearMatchMedia();
      document.body.classList.remove("gsap-active");
    };
  }, [dep]);
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

function buildQueryString(params) {
  const search = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value)) {
      if (!value.length) return;
      search.set(key, value.join(","));
      return;
    }
    search.set(key, String(value));
  });
  const query = search.toString();
  return query ? `?${query}` : "";
}

export function useProductSearch({
  initialQuery = "",
  initialFilters = { category: "All" },
  pageSize = 12,
  useApi = true,
  debounceMs = 180,
} = {}) {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState(initialFilters);
  const [results, setResults] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, pageSize, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [query, filters]);

  const runLocalSearch = useCallback(() => {
    const local = searchProductsLocal(TEMPLATES, {
      query,
      filters,
      page,
      pageSize,
    });
    setResults(local.results);
    setMeta({
      total: local.total,
      page: local.page,
      pageSize: local.pageSize,
      totalPages: local.totalPages,
    });
  }, [query, filters, page, pageSize]);

  const runSearch = useCallback(async () => {
    if (!useApi) {
      runLocalSearch();
      return;
    }

    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const qs = buildQueryString({
        q: query,
        category: filters?.category,
        tech: filters?.tech,
        feature: filters?.feature,
        minDownloads: filters?.minDownloads,
        page,
        pageSize,
      });
      const res = await fetch(apiUrl(`/api/search/products${qs}`), { signal: controller.signal });
      if (!res.ok) throw new Error("Search request failed");
      const data = await res.json();
      setResults(data.results || []);
      setMeta({
        total: data.total || 0,
        page: data.page || 1,
        pageSize: data.pageSize || pageSize,
        totalPages: data.totalPages || 1,
      });
    } catch (err) {
      setError(err?.message || "Search error");
      runLocalSearch();
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  }, [query, filters, page, pageSize, useApi, runLocalSearch]);

  useEffect(() => {
    const t = setTimeout(runSearch, debounceMs);
    return () => clearTimeout(t);
  }, [runSearch, debounceMs]);

  return {
    query,
    setQuery,
    filters,
    setFilters,
    results,
    loading,
    error,
    page,
    setPage,
    meta,
    refresh: runSearch,
  };
}

export function useSiteSearch({
  initialQuery = "",
  initialType = [],
  pageSize = 10,
  useApi = true,
  debounceMs = 180,
} = {}) {
  const [query, setQuery] = useState(initialQuery);
  const [types, setTypes] = useState(initialType);
  const [results, setResults] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, pageSize, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [query, types]);

  const runLocalSearch = useCallback(() => {
    const local = searchSiteLocal(SITE_INDEX, {
      query,
      type: types,
      page,
      pageSize,
    });
    setResults(local.results);
    setMeta({
      total: local.total,
      page: local.page,
      pageSize: local.pageSize,
      totalPages: local.totalPages,
    });
  }, [query, types, page, pageSize]);

  const runSearch = useCallback(async () => {
    if (!useApi) {
      runLocalSearch();
      return;
    }

    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const qs = buildQueryString({
        q: query,
        type: types,
        page,
        pageSize,
      });
      const res = await fetch(apiUrl(`/api/search/site${qs}`), { signal: controller.signal });
      if (!res.ok) throw new Error("Search request failed");
      const data = await res.json();
      setResults(data.results || []);
      setMeta({
        total: data.total || 0,
        page: data.page || 1,
        pageSize: data.pageSize || pageSize,
        totalPages: data.totalPages || 1,
      });
    } catch (err) {
      setError(err?.message || "Search error");
      runLocalSearch();
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  }, [query, types, page, pageSize, useApi, runLocalSearch]);

  useEffect(() => {
    const t = setTimeout(runSearch, debounceMs);
    return () => clearTimeout(t);
  }, [runSearch, debounceMs]);

  return {
    query,
    setQuery,
    types,
    setTypes,
    results,
    loading,
    error,
    page,
    setPage,
    meta,
    refresh: runSearch,
  };
}
