// src/features/member/pages/Account/MyProfile.jsx
import React, { useEffect, useState } from "react";
import "../../../../styles/auth.css";
import { getMyMemberProfile, updateMyMemberProfile } from "../../services/memberApi";

export default function MyProfile() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    zip: "",
  });

  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getMyMemberProfile();
        setForm((p) => ({ ...p, ...(data.member || {}) }));
      } catch (e) {
        console.error(e);
        setErr("Could not load your profile.");
      }
    })();
  }, []);

  const upd = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    setErr("");
    setBusy(true);
    try {
      await updateMyMemberProfile({
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        address_line1: form.address_line1,
        address_line2: form.address_line2,
        city: form.city,
        state: form.state,
        zip: form.zip,
      });
      setMsg("✅ Profile saved.");
    } catch (e2) {
      console.error(e2);
      setErr(e2?.response?.data?.error || "Could not save profile.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {msg && <div className="auth-banner" role="status">{msg}</div>}
      {err && <div className="auth-banner" role="alert">{err}</div>}

      <form className="auth-form" onSubmit={submit} style={{ maxWidth: 720 }}>
        <div className="auth-grid-2">
          <div className="auth-field">
            <label>First Name</label>
            <input value={form.first_name || ""} onChange={(e) => upd("first_name", e.target.value)} />
          </div>
          <div className="auth-field">
            <label>Last Name</label>
            <input value={form.last_name || ""} onChange={(e) => upd("last_name", e.target.value)} />
          </div>
        </div>

        <div className="auth-grid-2">
          <div className="auth-field">
            <label>Email (login)</label>
            <input value={form.email || ""} disabled />
          </div>
          <div className="auth-field">
            <label>Phone</label>
            <input value={form.phone || ""} onChange={(e) => upd("phone", e.target.value)} />
          </div>
        </div>

        <div className="auth-field">
          <label>Address line 1</label>
          <input value={form.address_line1 || ""} onChange={(e) => upd("address_line1", e.target.value)} />
        </div>
        <div className="auth-field">
          <label>Address line 2</label>
          <input value={form.address_line2 || ""} onChange={(e) => upd("address_line2", e.target.value)} />
        </div>

        <div className="auth-grid-3">
          <div className="auth-field">
            <label>City</label>
            <input value={form.city || ""} onChange={(e) => upd("city", e.target.value)} />
          </div>
          <div className="auth-field">
            <label>State</label>
            <input value={form.state || ""} onChange={(e) => upd("state", e.target.value)} />
          </div>
          <div className="auth-field">
            <label>ZIP</label>
            <input value={form.zip || ""} onChange={(e) => upd("zip", e.target.value)} />
          </div>
        </div>

        <button className="auth-btn" disabled={busy}>
          {busy ? "Saving…" : "Save changes"}
        </button>
      </form>
    </div>
  );
}