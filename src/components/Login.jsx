


// src/components/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../styles/auth.css";
import api from "./api";
import { useAuth, landingForRole } from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const nav = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const nextParam = new URLSearchParams(location.search).get("next");
  const cameFromState = !!location.state?.from;

  // If there's no reason to be on /login, bounce guest back to home
  useEffect(() => {
    if (!nextParam && !cameFromState) {
      nav("/", { replace: true });
    }
  }, [nextParam, cameFromState, nav]);

  function afterLoginRedirect(user) {
    if (nextParam) return nextParam;
    return landingForRole(user?.role);
  }

  async function submit(e) {
    e.preventDefault();
    setErr("");

    if (!email.trim() || !password) {
      setErr("Please enter your email and password.");
      return;
    }

    setBusy(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      if (!data?.token) throw new Error("Invalid response from server.");

      auth?.setToken?.(data.token);
      auth?.setUser?.(data.user || null);

      try {
        api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      } catch {}

      nav(afterLoginRedirect(data.user), { replace: true });
    } catch (e2) {
      console.error("Login error:", e2);

      if (!e2.response) {
        setErr(
          "Unable to reach the server. Please confirm the API is running on http://localhost:5000."
        );
      } else if (e2.response.status === 401) {
        setErr("Incorrect email or password.");
      } else {
        setErr(
          e2.response?.data?.error ||
            e2.response?.data?.message ||
            "Login failed."
        );
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card auth-card-narrow">
        <div className="auth-head">
          <h1 className="auth-head-title">Log in</h1>
          <button
            type="button"
            className="auth-head-close"
            aria-label="Close login"
            onClick={() => nav("/")}
          >
            ✕
          </button>
        </div>

        <form className="auth-form" onSubmit={submit} noValidate>
          <div className="auth-field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="login-pw">Password</label>
            <input
              id="login-pw"
              type="password"
              autoComplete="current-password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPw(e.target.value)}
              required
            />
          </div>

          {err && (
            <div className="auth-banner" role="alert">
              {err}
            </div>
          )}

          <button
            className="auth-btn"
            type="submit"
            disabled={busy || !email.trim() || !password}
          >
            {busy ? "Signing in…" : "Login"}
          </button>

          <div className="auth-help-row">
            <Link className="auth-link" to="/forgot-password">
              Forgot Password
            </Link>
          </div>

          <p className="auth-switch">
            Don’t have an account?{" "}
            <Link to="/register" className="auth-link">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
