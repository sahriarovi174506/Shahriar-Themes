// Base URL for the backend API.
// Set VITE_API_URL in your .env file (or Vercel environment variables) to point to your deployed backend.
// Example: VITE_API_URL=https://shahriar-themes-backend.vercel.app
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
