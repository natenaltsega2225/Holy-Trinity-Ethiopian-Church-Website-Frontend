// src/components/api.js
import axios from "axios";

let baseURL = (import.meta.env.VITE_API_URL || "").trim();

if (!baseURL) {
  baseURL = import.meta.env.DEV
    ? "http://localhost:5000/api"
    : `${window.location.origin}/api`;
} else {
  if (!/\/api\/?$/.test(baseURL))
    baseURL = baseURL.replace(/\/+$/, "") + "/api";
  baseURL = baseURL.replace(/\/+$/, "");
}

let accessToken = "";

export function setAccessToken(t) {
  accessToken = t || "";
  try {
    if (accessToken) localStorage.setItem("ht_token", accessToken);
    else localStorage.removeItem("ht_token");
  } catch {}
}

export function getAccessToken() {
  if (accessToken) return accessToken;
  try {
    accessToken = localStorage.getItem("ht_token") || "";
  } catch {
    accessToken = "";
  }
  return accessToken;
}

export function getBaseURL() {
  return baseURL;
}

/**
 * Convert saved URLs into browser-openable URLs
 * - If backend returns "/uploads/..." -> make it "http(s)://host/uploads/..."
 * - If it is already "https://..." keep it
 */
export function toPublicUrl(raw) {
  const s = String(raw || "").trim();
  if (!s) return "";

  // already absolute
  if (/^https?:\/\//i.test(s)) return s;

  // handle "/uploads/..." (served by server.js static)
  if (s.startsWith("/uploads/")) {
    return `${window.location.origin}${s}`;
  }

  // if you stored something like "uploads/..." without leading slash
  if (s.startsWith("uploads/")) {
    return `${window.location.origin}/${s}`;
  }

  // anything else: return as-is
  return s;
}

const api = axios.create({
  baseURL,
  timeout: 20000,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const t = getAccessToken();
  if (t) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
});

let refreshPromise = null;

async function refreshTokenOnce() {
  if (!refreshPromise) {
    refreshPromise = api
      .post("/auth/refresh", {})
      .then((res) => {
        if (res?.data?.token) setAccessToken(res.data.token);
        return res;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const status = err?.response?.status;
    const original = err?.config;

    if (!original) throw err;

    const url = String(original.url || "");
    const isAuthRefresh = url.includes("/auth/refresh");
    const isAuthLogin = url.includes("/auth/login");
    const isAuthRegister = url.includes("/auth/register");

    if (isAuthRefresh || isAuthLogin || isAuthRegister) throw err;

    if (status === 401 && !original._retry) {
      original._retry = true;
      try {
        await refreshTokenOnce();
        return api(original);
      } catch {
        setAccessToken("");
        throw err;
      }
    }

    throw err;
  },
);

export default api;
