// src/pages/Membership.jsx
import React, { useState } from "react";
import api from "../api/apiClient";

export default function Membership() {
  const [amount, setAmount] = useState(25);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function pay() {
    setErr(""); setBusy(true);
    try {
      // prefer dues endpoint if you created it:
      try {
        const { data } = await api.post("/dues/pay", {
          amount,
          success_url: window.location.origin + "/membership?status=success",
          cancel_url: window.location.origin + "/membership?status=cancel"
        });
        window.location.href = data.url;
        return;
      } catch (inner) {
        // fallback to donations as "membership"
        const { data } = await api.post("/donations/create-checkout-session", {
          amount,
          success_url: window.location.origin + "/membership?status=success",
          cancel_url: window.location.origin + "/membership?status=cancel",
          member_id: "current"
        });
        window.location.href = data.url;
      }
    } catch (e) {
      setErr(e.response?.data?.error || "Could not start checkout");
      setBusy(false);
    }
  }

  return (
    <main style={{maxWidth:520, margin:"24px auto", padding:"0 16px"}}>
      <h2>Monthly Membership</h2>
      <p>Pay your monthly membership fee online.</p>
      {err && <div role="alert">{err}</div>}
      <div style={{display:"flex", gap:8, alignItems:"center"}}>
        <span>$</span>
        <input type="number" min="1" step="1" value={amount} onChange={e=>setAmount(e.target.value)} />
        <button disabled={busy} onClick={pay}>{busy ? "Redirecting…" : "Pay now"}</button>
      </div>
    </main>
  );
}
