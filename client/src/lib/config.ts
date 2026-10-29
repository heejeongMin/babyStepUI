// Set VITE_API_BASE_URL at build time for deployments. Empty string means same origin (API behind the same host).
export const BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
