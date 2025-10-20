import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setErr("");
    if (!email || !pw) {
      setErr("Please enter your email and password.");
      return;
    }
    setLoading(true);

    // TODO: replace with real API call
    setTimeout(() => {
      const saved = localStorage.getItem("ht_user");
      if (!saved) {
        setErr("No account found. Please register first.");
        setLoading(false);
        return;
      }
      localStorage.setItem("ht_session", JSON.stringify({ email, ts: Date.now() }));
      setLoading(false);
      navigate("/");
    }, 550);
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card auth-card-narrow">
        {/* Title bar like screenshot */}
        <div className="auth-head">
          <h1 className="auth-head-title">Log in to My Church</h1>
          <button className="auth-head-close" onClick={() => navigate("/")}>✕</button>
        </div>

        <form className="auth-form" onSubmit={submit} noValidate>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder=""
              autoComplete="current-password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </div>

          {err && <div className="auth-banner">{err}</div>}

          <button className="auth-btn auth-btn-green" disabled={loading}>
            {loading ? "Logging in…" : "LOGIN"}
          </button>

          <div className="auth-help-row">
            <a className="auth-link" href="#">Forgot Password</a>
          </div>

          <p className="auth-switch">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="auth-link">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
