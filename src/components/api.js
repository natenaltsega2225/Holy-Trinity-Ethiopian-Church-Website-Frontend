// // // src/components/api.js
// import axios from "axios";

// // ✅ hard-disable global credentials (protects you if anything else sets it)
// axios.defaults.withCredentials = false;

// // -------- Base URL detection (DEV vs PROD) --------
// let baseURL = (import.meta.env.VITE_API_URL || "").trim();

// if (!baseURL) {
//   baseURL = import.meta.env.DEV
//     ? "http://localhost:5000/api"
//     : `${window.location.origin}/api`;
// } else {
//   // Ensure /api suffix
//   if (!/\/api\/?$/.test(baseURL)) {
//     baseURL = baseURL.replace(/\/+$/, "") + "/api";
//   }
//   baseURL = baseURL.replace(/\/+$/, "");
// }

// export function getBaseURL() {
//   return baseURL;
// }

// const api = axios.create({
//   baseURL,
//   timeout: 20000,
//   withCredentials: false, // ✅ IMPORTANT
// });

// // ✅ force OFF on every request (even if something tries to flip it)
// api.defaults.withCredentials = false;

// api.interceptors.request.use((config) => {
//   config.withCredentials = false;

//   // Attach JWT if present
//   try {
//     const t = localStorage.getItem("ht_token");
//     if (t) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${t}`;
//     }
//   } catch {}

//   return config;
// });

// // Helpful: normalize axios errors
// api.interceptors.response.use(
//   (res) => res,
//   (err) => Promise.reject(err)
// );

// export default api;






// // src/components/api.js
// import axios from "axios";

// let baseURL = (import.meta.env.VITE_API_URL || "").trim();

// if (!baseURL) {
//   baseURL = import.meta.env.DEV
//     ? "http://localhost:5000/api"
//     : `${window.location.origin}/api`;
// } else {
//   baseURL = baseURL.replace(/\/+$/, "");
//   if (!/\/api$/.test(baseURL)) baseURL += "/api";
// }

// export function getBaseURL() {
//   return baseURL;
// }

// const api = axios.create({
//   baseURL,
//   timeout: 30000,
//   withCredentials: false,
// });

// api.interceptors.request.use((config) => {
//   config.withCredentials = false;
//   const t = localStorage.getItem("ht_token");
//   if (t) {
//     config.headers = config.headers || {};
//     config.headers.Authorization = `Bearer ${t}`;
//   }
//   return config;
// });

// export default api;
// src/components/api.js
import axios from "axios";

// ✅ hard-disable global credentials (protects you if anything else sets it)
axios.defaults.withCredentials = false;

// -------- Base URL detection (DEV vs PROD) --------
let baseURL = (import.meta.env.VITE_API_URL || "").trim();

if (!baseURL) {
  baseURL = import.meta.env.DEV
    ? "http://localhost:5000/api"
    : `${window.location.origin}/api`;
} else {
  // Ensure /api suffix
  if (!/\/api\/?$/.test(baseURL)) {
    baseURL = baseURL.replace(/\/+$/, "") + "/api";
  }
  baseURL = baseURL.replace(/\/+$/, "");
}

export function getBaseURL() {
  return baseURL;
}

const api = axios.create({
  baseURL,
  timeout: 20000,
  withCredentials: false, // ✅ IMPORTANT
});

// ✅ force OFF on every request (even if something tries to flip it)
api.defaults.withCredentials = false;

api.interceptors.request.use((config) => {
  config.withCredentials = false;

  // Attach JWT if present
  try {
    const t = localStorage.getItem("ht_token");
    if (t) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${t}`;
    }
  } catch {}

  return config;
});

// Helpful: normalize axios errors
api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default api;
