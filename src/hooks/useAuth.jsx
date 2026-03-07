// src/hooks/useAuth.jsx
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import api, { getAccessToken, setAccessToken } from "../components/api";

const AuthContext = createContext(null);

export function landingForRole(role) {
  if (role === "admin") return "/dash/admin";
  if (role === "finance") return "/dash/finance";
  return "/dash/membership";
}

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getAccessToken());
  const [user, setUserState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ht_user") || "null");
    } catch {
      return null;
    }
  });
  const [booting, setBooting] = useState(true);
  const didBoot = useRef(false);

  const setToken = (t) => {
    const v = t || "";
    setTokenState(v);
    setAccessToken(v);
  };

  const setUser = (u) => {
    const v = u || null;
    setUserState(v);
    try {
      if (v) localStorage.setItem("ht_user", JSON.stringify(v));
      else localStorage.removeItem("ht_user");
    } catch {}
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout", {});
    } catch {}
    setToken("");
    setUser(null);
  };

  const isAuthed = !!token;

  const hasRole = (...roles) => {
    const r = user?.role;
    return !!r && roles.includes(r);
  };

  // Boot: try refresh once (cookie -> new access token)
  useEffect(() => {
    if (didBoot.current) return; // ✅ prevents double-run in StrictMode
    didBoot.current = true;

    let alive = true;

    (async () => {
      try {
        const { data } = await api.post("/auth/refresh", {});
        if (!alive) return;
        if (data?.token) setToken(data.token);
        if (data?.user) setUser(data.user);
      } catch {
        // no cookie / expired -> stay logged out
        if (!alive) return;
        setToken("");
        // keep user null
      } finally {
        if (alive) setBooting(false);
      }
    })();

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      booting,
      isAuthed,
      hasRole,
      setToken,
      setUser,
      logout,
    }),
    [token, user, booting]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}