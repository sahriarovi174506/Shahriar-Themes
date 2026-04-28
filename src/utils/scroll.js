export function scrollToTop(options = {}) {
  if (typeof window === "undefined") return;

  const { immediate = false } = options;
  const lenis = window.lenis;

  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(0, { immediate });
    return;
  }

  window.scrollTo({
    top: 0,
    behavior: immediate ? "auto" : "smooth",
  });
}
