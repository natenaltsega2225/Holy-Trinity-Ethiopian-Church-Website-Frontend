
// // src/components/api.js
// // src/components/api.js
// import axios from "axios";

// // Normalize base URL
// let baseURL = (import.meta.env.VITE_API_URL || "").trim();
// if (!baseURL) {
//   baseURL = import.meta.env.DEV
//     ? "http://localhost:5000/api"
//     : `${window.location.origin}/api`;
// } else {
//   baseURL = baseURL.replace(/\/+$/, ""); // strip trailing slash
// }

// const api = axios.create({
//   baseURL,
//   withCredentials: true,
//   timeout: 20000,
// });

// // ---- attach bearer token (from localStorage)
// api.interceptors.request.use((config) => {
//   try {
//     const t = localStorage.getItem("ht_token");
//     if (t) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${t}`;
//     }
//   } catch {
//     // ignore localStorage issues
//   }
//   return config;
// });

// // ✅ Only these dashboard routes should trigger a login redirect
// const PROTECTED_PREFIXES = [
//   "/dash/admin",
//   "/dash/finance",
//   "/dash/membership",
// ];

// // ---- auth bounce (only for protected paths, and ignore auth/login + auth/register)
// api.interceptors.response.use(
//   (r) => r,
//   (err) => {
//     const status = err?.response?.status;
//     const url = err?.config?.url || "";

//     // Do NOT auto-redirect if the failing request is login/register
//     const isAuthCall =
//       url.includes("/auth/login") || url.includes("/auth/register");

//     if ((status === 401 || status === 403) && !isAuthCall) {
//       const path = window.location.pathname || "";

//       // Check if current page is one of the protected dashboard sections
//       const isProtectedPath = PROTECTED_PREFIXES.some((prefix) => {
//         return path === prefix || path.startsWith(prefix + "/");
//       });

//       if (isProtectedPath) {
//         // Clear stored auth and send to login
//         try {
//           localStorage.removeItem("ht_token");
//           localStorage.removeItem("ht_user");
//         } catch {}

//         const next = encodeURIComponent(path + window.location.search);
//         window.location.assign(`/login?next=${next}`);
//         return;
//       }

//       // 🔓 For non-protected pages, do NOT redirect — just let the component see the 401/403
//     }

//     return Promise.reject(err);
//   }
// );

// // Optional helpers
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

// /**
//  * Returns the API base URL, e.g. "http://localhost:5000/api"
//  */
// export function getBaseURL() {
//   return baseURL;
// }

// /**
//  * Build a full URL for files served from the backend `/uploads` folder.
//  * Example: getFileURL("/uploads/news-events/file.pdf")
//  *  -> http://localhost:5000/uploads/news-events/file.pdf
//  */
// export function getFileURL(relPath) {
//   if (!relPath) return "";
//   const apiRoot = baseURL;
//   // Strip trailing ".../api" to get the origin
//   const root = apiRoot.replace(/\/api$/, "");
//   const path = relPath.startsWith("/") ? relPath : `/${relPath}`;
//   return `${root}${path}`;
// }

// export default api;

// src/components/api.js
// src/components/api.js
import axios from "axios";

// -------- Base URL detection --------
let baseURL = (import.meta.env.VITE_API_URL || "").trim();

if (!baseURL) {
  baseURL = import.meta.env.DEV
    ? "http://localhost:5000/api"
    : `${window.location.origin}/api`;
} else {
  baseURL = baseURL.replace(/\/+$/, ""); // strip trailing slashes
}

const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 20000,
});

// -------- Attach token, but NO redirects anywhere --------
api.interceptors.request.use((config) => {
  try {
    const t = localStorage.getItem("ht_token");
    if (t) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${t}`;
    }
  } catch {
    // ignore
  }
  return config;
});

// ❌ NO redirect logic here at all
api.interceptors.response.use(
  (response) => response,
  (err) => Promise.reject(err)
);

// Helper: set/clear auth token
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

// Helper: get base URL
export function getBaseURL() {
  return baseURL;
}

// Helper: build file URLs (for /uploads etc.)
export function getFileURL(relPath) {
  if (!relPath) return "";
  const apiRoot = baseURL;
  const root = apiRoot.replace(/\/api$/, ""); // strip /api
  const path = relPath.startsWith("/") ? relPath : `/${relPath}`;
  return `${root}${path}`;
}

export default api;

