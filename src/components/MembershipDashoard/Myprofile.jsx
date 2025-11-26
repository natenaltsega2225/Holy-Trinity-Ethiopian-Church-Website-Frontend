//src/components/MembershipDashoard/Myprofile.jsx
// src/components/MembershipDashoard/Myprofile.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "../Shared/DashboardLayout";
import api from "../api";
import { useAuth } from "../../hooks/useAuth";

const NAV = [
  { to: "/dash/membership", label: "Overview", end: true },
  { to: "/dash/membership/my-profile", label: "My Profile" },
  { to: "/dash/membership/my-payments", label: "My Payments" },
  { to: "/dash/membership/renewal", label: "Membership Renewal" },
  { to: "/dash/membership/invoices", label: "Invoices & Receipts" },
  { to: "/dash/membership/announcements", label: "Announcements" },
];

export default function Myprofile() {
  const { user, setUser } = useAuth() || {};
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
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
        const { data } = await api.get("/auth/me");
        const u = data.user;
        setForm({
          first_name: u.first_name || "",
          last_name: u.last_name || "",
          phone: u.phone || "",
          address_line1: u.address_line1 || "",
          address_line2: u.address_line2 || "",
          city: u.city || "",
          state: u.state || "",
          zip: u.zip || "",
        });
      } catch (e) {
        console.error(e);
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
      await api.put("/auth/me", form);
      setMsg("Profile updated.");

      // also update auth context copy
      if (setUser && user) {
        setUser({ ...user, ...form });
      }
    } catch (e2) {
      setErr(e2.response?.data?.error || "Could not update profile.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <DashboardLayout title="My Profile" nav={NAV}>
      <form className="auth-form" onSubmit={submit} style={{ maxWidth: 640 }}>
        <div className="auth-grid-2">
          <div className="auth-field">
            <label>First Name</label>
            <input
              value={form.first_name}
              onChange={(e) => upd("first_name", e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <label>Last Name</label>
            <input
              value={form.last_name}
              onChange={(e) => upd("last_name", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="auth-grid-2">
          <div className="auth-field">
            <label>Phone</label>
            <input
              value={form.phone}
              onChange={(e) => upd("phone", e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label>Email</label>
            <input value={user?.email || ""} disabled />
          </div>
        </div>

        <div className="auth-field">
          <label>Address 1</label>
          <input
            value={form.address_line1}
            onChange={(e) => upd("address_line1", e.target.value)}
          />
        </div>
        <div className="auth-field">
          <label>Address 2</label>
          <input
            value={form.address_line2}
            onChange={(e) => upd("address_line2", e.target.value)}
          />
        </div>

        <div className="auth-grid-3">
          <div className="auth-field">
            <label>City</label>
            <input
              value={form.city}
              onChange={(e) => upd("city", e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label>State</label>
            <input
              value={form.state}
              onChange={(e) => upd("state", e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label>ZIP</label>
            <input
              value={form.zip}
              onChange={(e) => upd("zip", e.target.value)}
            />
          </div>
        </div>

        {msg && <div className="auth-banner">{msg}</div>}
        {err && <div className="auth-banner">{err}</div>}

        <div style={{ marginTop: 12 }}>
          <button disabled={busy}>{busy ? "Saving…" : "Save Changes"}</button>
        </div>
      </form>
    </DashboardLayout>
  );
}
