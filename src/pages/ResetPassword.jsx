// src/pages/ResetPassword.jsx
// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../components/api";

export default function ResetPassword() {
  const [sp] = useSearchParams();
  const token = sp.get("token") || "";
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    setErr("");

    if (pw1 !== pw2) {
      setErr("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/reset-password", {
        token,
        new_password: pw1,
      });
      setMsg("Password reset successful. You can log in now.");
      setTimeout(() => nav("/login"), 1200);
    } catch (e2) {
      setErr(e2.response?.data?.error || "Reset failed");
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: "24px auto", padding: "0 16px" }}>
      <h2>Reset Password</h2>
      {msg && <div role="status">{msg}</div>}
      {err && <div role="alert">{err}</div>}
      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <input
          type="password"
          placeholder="New password"
          value={pw1}
          onChange={(e) => setPw1(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
          required
        />
        <button>Reset</button>
      </form>
    </main>
  );
}
