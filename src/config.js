// Base URL for the backend API.
// In production, we use relative paths or the official domain.
// In development, we fallback to the current origin.
export const API_URL = import.meta.env.VITE_API_URL || "";

export function apiUrl(pathname) {
  // If API_URL is present, use it as the base (useful for cross-origin production backends)
  // If not, return the pathname as a relative path (best for Vite dev proxy)
  if (API_URL) {
    try {
      return new URL(pathname, API_URL).toString();
    } catch {
      return pathname;
    }
  }
  return pathname;
}
