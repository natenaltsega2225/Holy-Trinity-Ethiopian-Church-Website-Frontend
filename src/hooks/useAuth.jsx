// // src/hooks/useAuth.jsx

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("ht_token") || "");
  const [user, setUser]   = useState(() => {
    try { return JSON.parse(localStorage.getItem("ht_user") || "null"); }
    catch { return null; }
  });

  // keep localStorage in sync
  useEffect(() => {
    if (token) localStorage.setItem("ht_token", token);
    else localStorage.removeItem("ht_token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("ht_user", JSON.stringify(user));
    else localStorage.removeItem("ht_user");
  }, [user]);

  const value = useMemo(() => ({ token, setToken, user, setUser }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}


// in hooks/useAuth.jsx
// src/hooks/useAuth.jsx (add/export this)
export function landingForRole(role) {
  if (role === 'admin')   return '/dash/admin';
  if (role === 'finance') return '/dash/finance';
  return '/dash/membership';
}

