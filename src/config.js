// Base URL for the backend API.
// In production, we use relative paths or the official domain.
// In development, we fallback to the current origin.
export const API_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' ? window.location.origin : '');

export function apiUrl(pathname) {
  // If API_URL is present, use it as the base.
  // Otherwise, use a relative path.
  try {
    return new URL(pathname, API_URL || window.location.origin).toString();
  } catch (e) {
    return pathname;
  }
}
