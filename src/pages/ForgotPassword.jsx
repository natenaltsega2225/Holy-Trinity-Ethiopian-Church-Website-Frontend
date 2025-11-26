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
      setSent(true);
    } catch (e2) {
      setErr(e2.response?.data?.error || "Could not send reset email");
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: "24px auto", padding: "0 16px" }}>
      <h2>Forgot Password</h2>
      {sent ? (
        <p>We’ve sent a reset link if that email exists in our system.</p>
      ) : (
        <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {err && <div role="alert">{err}</div>}
          <button>Send reset link</button>
        </form>
      )}
    </main>
  );
}
