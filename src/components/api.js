
// // src/components/api.js
// import axios from "axios";

// // -------- Base URL detection --------
// let baseURL = (import.meta.env.VITE_API_URL || "").trim();

// if (!baseURL) {
//   baseURL = import.meta.env.DEV
//     ? "http://localhost:5000/api"
//     : `${window.location.origin}/api`;
// } else {
//   baseURL = baseURL.replace(/\/+$/, ""); // strip trailing slashes
// }

// const api = axios.create({
//   baseURL,
//   withCredentials: true,
//   timeout: 20000,
// });

// // -------- Attach token, but NO redirects anywhere --------
// api.interceptors.request.use((config) => {
//   try {
//     const t = localStorage.getItem("ht_token");
//     if (t) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${t}`;
//     }
//   } catch {
//     // ignore
//   }
//   return config;
// });

// // ❌ NO redirect logic here at all
// api.interceptors.response.use(
//   (response) => response,
//   (err) => Promise.reject(err)
// );

// // Helper: set/clear auth token
// export function setAuthToken(token) {
//   if (token) {
//     localStorage.setItem("ht_token", token);
//     try {
//       api.defaults.headers.common.Authorization = `Bearer ${token}`;
//     } catch {}
//   } else {
//     localStorage.removeItem("ht_token");
//     try {
//       delete api.defaults.headers.common.Authorization;
//     } catch {}
//   }
// }

// // Helper: get base URL
// export function getBaseURL() {
//   return baseURL;
// }

// // Helper: build file URLs (for /uploads etc.)
// export function getFileURL(relPath) {
//   if (!relPath) return "";
//   const apiRoot = baseURL;
//   const root = apiRoot.replace(/\/api$/, ""); // strip /api
//   const path = relPath.startsWith("/") ? relPath : `/${relPath}`;
//   return `${root}${path}`;
// }

// export default api;

// src/components/api.js
import axios from "axios";

// -------- Base URL detection (DEV vs PROD) --------
let baseURL = (import.meta.env.VITE_API_URL || "").trim();

if (!baseURL) {
  // Local development fallback
  baseURL = import.meta.env.DEV
    ? "http://localhost:5000/api"
    : `${window.location.origin}/api`;
} else {
  // Remove trailing slash
  baseURL = baseURL.replace(/\/+$/, "");
}

const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 20000,
});

// -------- Attach JWT token (NO redirects here) --------
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("ht_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // ignore storage errors
  }
  return config;
});

// -------- NO global redirect logic --------
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// -------- Helper: set / clear auth token --------
export function setAuthToken(token) {
  if (token) {
    localStorage.setItem("ht_token", token);
    try {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } catch {}
  } else {
    localStorage.removeItem("ht_token");
    try {
      delete api.defaults.headers.common.Authorization;
    } catch {}
  }
}

// -------- Helper: get API base URL --------
export function getBaseURL() {
  return baseURL;
}

// -------- Helper: build file URLs (for /uploads, PDFs, images) --------
export function getFileURL(relPath) {
  if (!relPath) return "";
  const apiRoot = baseURL.replace(/\/api$/, ""); // strip /api if present
  const cleanPath = relPath.startsWith("/") ? relPath : `/${relPath}`;
  return `${apiRoot}${cleanPath}`;
}

export default api;
