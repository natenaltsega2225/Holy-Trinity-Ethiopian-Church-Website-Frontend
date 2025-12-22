
// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, landingForRole } from "../hooks/useAuth";

export default function ProtectedRoute({ roles, children }) {
  const auth = useAuth();
  const loc = useLocation();

  // Optional dev bypass (keep if you like)
  const devBypass =
    import.meta.env.VITE_BYPASS_AUTH === "1" ||
    localStorage.getItem("ht_role_override") === "all";

  // If no auth context and no bypass → must log in
  if (!auth && !devBypass) {
    return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  }

  const token = devBypass ? "dev-token" : auth?.token;
  const user  = devBypass ? { role: "admin", email: "dev@local" } : auth?.user;

  // Not logged in → login screen
  if (!token) {
    return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  }

  // Role-based check
  if (!devBypass && roles?.length) {
    const userRole = user?.role || "member";

    if (!roles.includes(userRole)) {
      // ❗ Instead of sending to "/", send them to *their* landing dashboard
      const safe = landingForRole(userRole);
      return <Navigate to={safe} replace />;
    }
  }

  return children;
}
