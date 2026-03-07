// src/pages/ResetPassword.jsx
// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../components/api";
import "../styles/auth.css";

export default function ResetPassword() {
  const [sp] = useSearchParams();
  const token = sp.get("token") || "";

  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    setErr("");

    if (!token) return setErr("Missing reset token.");
    if (pw1.length < 12) return setErr("Password must be at least 12 characters.");
    if (pw1 !== pw2) return setErr("Passwords do not match.");

    setBusy(true);
    try {
      await api.post("/auth/reset-password", {
        token,
        new_password: pw1,
      });

      setMsg("Password reset successful. Redirecting to login…");
      setTimeout(() => nav("/login"), 1200);
    } catch (e2) {
      setErr(e2.response?.data?.error || "Reset failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card auth-card-narrow">
        <h1 className="auth-title">Reset Password</h1>

        {msg && (
          <div className="auth-banner" role="status">
            {msg}
          </div>
        )}
        {err && (
          <div className="auth-banner" role="alert">
            {err}
          </div>
        )}

        <form className="auth-form" onSubmit={submit} noValidate>
          <div className="auth-field">
            <label>New password</label>
            <input
              type="password"
              value={pw1}
              onChange={(e) => setPw1(e.target.value)}
              required
              placeholder="12+ characters"
            />
          </div>

          <div className="auth-field">
            <label>Confirm new password</label>
            <input
              type="password"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              required
            />
          </div>

          <button className="auth-btn" disabled={busy}>
            {busy ? "Resetting…" : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}