// // // src/hooks/useAuth.jsx

// import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [token, setToken] = useState(() => localStorage.getItem("ht_token") || "");
//   const [user, setUser]   = useState(() => {
//     try { return JSON.parse(localStorage.getItem("ht_user") || "null"); }
//     catch { return null; }
//   });

//   // keep localStorage in sync
//   useEffect(() => {
//     if (token) localStorage.setItem("ht_token", token);
//     else localStorage.removeItem("ht_token");
//   }, [token]);

//   useEffect(() => {
//     if (user) localStorage.setItem("ht_user", JSON.stringify(user));
//     else localStorage.removeItem("ht_user");
//   }, [user]);

//   const value = useMemo(() => ({ token, setToken, user, setUser }), [token, user]);
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }


// // in hooks/useAuth.jsx
// // src/hooks/useAuth.jsx (add/export this)
// export function landingForRole(role) {
//   if (role === 'admin')   return '/dash/admin';
//   if (role === 'finance') return '/dash/finance';
//   return '/dash/membership';
// }


// src/hooks/useAuth.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function landingForRole(role) {
  if (role === "admin") return "/dash/admin";
  if (role === "finance") return "/dash/finance";
  return "/dash/membership";
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("ht_token") || "");
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ht_user") || "null");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (token) localStorage.setItem("ht_token", token);
    else localStorage.removeItem("ht_token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("ht_user", JSON.stringify(user));
    else localStorage.removeItem("ht_user");
  }, [user]);

  const logout = () => {
    setToken("");
    setUser(null);
  };

  const isAuthed = !!token;

  const hasRole = (...roles) => {
    const r = user?.role;
    return !!r && roles.includes(r);
  };

  const value = useMemo(
    () => ({ token, setToken, user, setUser, logout, isAuthed, hasRole }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
