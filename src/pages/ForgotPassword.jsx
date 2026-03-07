// src/pages/ForgotPassword.jsx
// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import api from "../components/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");

    try {
      await api.post("/auth/forgot-password", { email });
      // Always show success (don’t reveal if email exists)
      setSent(true);
    } catch (e2) {
      setErr("Could not send reset email. Try again later.");
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card auth-card-narrow">
        <h1 className="auth-title">Forgot Password</h1>
        <p className="auth-sub">
          Enter your email. If it exists, we’ll send a password reset link.
        </p>

        {sent ? (
          <div className="auth-banner" role="status">
            If that email exists, a reset link was sent.
          </div>
        ) : (
          <form className="auth-form" onSubmit={submit} noValidate>
            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {err && (
              <div className="auth-banner" role="alert">
                {err}
              </div>
            )}

            <button className="auth-btn">Send reset link</button>
          </form>
        )}
      </div>
    </div>
  );
}