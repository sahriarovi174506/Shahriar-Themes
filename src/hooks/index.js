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
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 40);
      ticking = false;
    };
    const fn = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return scrolled;
}

export function useScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      setShow(window.scrollY > 400);
      ticking = false;
    };
    const fn = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return show;
}

export function useAnimateOnScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document
        .querySelectorAll(".fade-up,.fade-down,.fade-left,.fade-right")
        .forEach((el) => el.classList.add("animated"));
      return;
    }
    const els = document.querySelectorAll(".fade-up,.fade-down,.fade-left,.fade-right");
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("animated"); }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: true,
      lerp: 0.08,
      wheelMultiplier: 1,
    });

    document.documentElement.classList.add("lenis");
    window.lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.lenis;
      document.documentElement.classList.remove("lenis");
    };
  }, []);
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
  const prev = useCallback(() => {
    if (total <= 1) return;
    setIdx((i) => (i - 1 + total) % total);
  }, [total]);
  const next = useCallback(() => {
    if (total <= 1) return;
    setIdx((i) => (i + 1) % total);
  }, [total]);
  const go = useCallback((i) => {
    if (total <= 1) {
      setIdx(0);
      return;
    }
    setIdx(i);
  }, [total]);
  useEffect(() => {
    if (total <= 0) {
      setIdx(0);
      return;
    }
    setIdx((i) => Math.min(i, total - 1));
  }, [total]);
  useEffect(() => {
    if (!auto || total <= 1) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [auto, interval, next, total]);
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
export function useDownloadsApi(templateIdRaw, initialCount, repoUrl, { fetchOnMount = true } = {}) {
  const templateId = (templateIdRaw !== undefined && templateIdRaw !== null && !isNaN(Number(templateIdRaw))) ? Number(templateIdRaw) : null;
  const [count, setCount] = useState(initialCount);
  const [clicked, setClicked] = useState(false);
  const [loadedFor, setLoadedFor] = useState(null);
  const loading = templateId !== null && loadedFor !== templateId;

  useEffect(() => {
    setCount(initialCount);
    setClicked(false);
  }, [templateId, initialCount]);

  useEffect(() => {
    if (!templateId || !fetchOnMount) {
      if (templateId) setLoadedFor(templateId);
      return;
    }

    let active = true;
    const cachedCount = downloadCountCache.get(templateId);
    if (typeof cachedCount === "number") {
      setCount(cachedCount);
      setLoadedFor(templateId);
      return () => {
        active = false;
      };
    }

    const existingPromise = downloadRequestCache.get(templateId);
    const request = existingPromise || fetch(apiUrl(`/api/downloads/${templateId}`))
      .then(r => (r.ok ? r.json() : null))
      .catch(() => null);

    if (!existingPromise) {
      downloadRequestCache.set(templateId, request);
    }

    request
      .then((data) => {
        if (!active) return;
        if (data && typeof data.count === "number") {
          downloadCountCache.set(templateId, data.count);
          setCount(data.count);
        }
      })
      .finally(() => {
        if (!active) return;
        setLoadedFor(templateId);
        downloadRequestCache.delete(templateId);
      });

    return () => {
      active = false;
    };
  }, [templateId, fetchOnMount]);

  const download = async () => {
    if (clicked) return;
    setClicked(true);

    // OPTIMISTIC UPDATE: Increment immediately on the screen
    setCount((c) => {
      const next = c + 1;
      if (templateId) downloadCountCache.set(templateId, next);
      return next;
    });

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
            downloadCountCache.set(templateId, data.count);
          }
        }
      } catch (err) {
        console.error("Failed to update download count on server:", err);
      }
    }
  };

  return { count, download, clicked, loading };
}

const downloadCountCache = new Map();
const downloadRequestCache = new Map();

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
