
// src/components/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";
import api from "./api";
import { useAuth, landingForRole } from "../hooks/useAuth";

const initial = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  zip: "",
  password: "",
  confirm: "",
  agree: false,
};

export default function Register() {
  const [form, setForm] = useState(initial);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const nav = useNavigate();
  const auth = useAuth();

  const upd = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  async function submit(e) {
    e.preventDefault();
    setErr("");

    if (form.password.length < 6) return setErr("Password must be at least 6 characters.");
    if (form.password !== form.confirm) return setErr("Passwords do not match.");
    if (!form.agree) return setErr("You must agree to the terms.");

    setBusy(true);
    try {
      const payload = {
        ...form,
        username: form.email, // email-as-username
      };

      const { data } = await api.post("/auth/register", payload);
      if (!data?.token) throw new Error("Invalid response from server.");

      // Save to auth context + localStorage
      auth?.setToken?.(data.token);
      auth?.setUser?.(data.user || null);

      // Convenience header
      try {
        api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      } catch {}

      // Send them to their dashboard (member by default)
      const landing = landingForRole(data.user?.role || "member");
      nav(landing, { replace: true });
    } catch (e2) {
      console.error("Register error:", e2);
      setErr(e2.response?.data?.error || "Registration failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-sub">
          Join our parish portal to receive updates and access member resources.
        </p>

        {err && (
          <div className="auth-banner" role="alert">
            {err}
          </div>
        )}

        <form className="auth-form" onSubmit={submit} noValidate>
          <div className="auth-grid-2">
            <div className="auth-field">
              <label>First Name</label>
              <input
                value={form.first_name}
                onChange={(e) => upd("first_name", e.target.value)}
                autoComplete="given-name"
                required
              />
            </div>
            <div className="auth-field">
              <label>Last Name</label>
              <input
                value={form.last_name}
                onChange={(e) => upd("last_name", e.target.value)}
                autoComplete="family-name"
                required
              />
            </div>
          </div>

          <div className="auth-grid-2">
            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => upd("email", e.target.value)}
                autoComplete="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="auth-field">
              <label>Phone (optional)</label>
              <input
                value={form.phone}
                onChange={(e) => upd("phone", e.target.value)}
                inputMode="tel"
                placeholder="+1 (615) 555-0123"
              />
            </div>
          </div>

          <div className="auth-field">
            <label>Address line 1</label>
            <input
              value={form.address_line1}
              onChange={(e) => upd("address_line1", e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <label>Address line 2 (optional)</label>
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
                required
              />
            </div>
            <div className="auth-field">
              <label>State</label>
              <input
                value={form.state}
                onChange={(e) => upd("state", e.target.value)}
                required
              />
            </div>
            <div className="auth-field">
              <label>ZIP</label>
              <input
                value={form.zip}
                onChange={(e) => upd("zip", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-grid-2">
            <div className="auth-field">
              <label>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => upd("password", e.target.value)}
                autoComplete="new-password"
                placeholder="Create a password"
                required
              />
            </div>
            <div className="auth-field">
              <label>Confirm Password</label>
              <input
                type="password"
                value={form.confirm}
                onChange={(e) => upd("confirm", e.target.value)}
                autoComplete="new-password"
                placeholder="Re-enter password"
                required
              />
            </div>
          </div>

          {/* Terms row */}
          <div className="auth-terms">
            <button
              type="button"
              className="terms-readmore"
              onClick={() => setShowTerms(true)}
              aria-haspopup="dialog"
              aria-expanded={showTerms}
            >
              Read Membership Terms & Conditions →
            </button>

            <label className="terms-check">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => upd("agree", e.target.checked)}
              />
              <span>I have read and agree to the Terms & Conditions.</span>
            </label>
          </div>

          <button className="auth-btn" disabled={busy || !form.agree}>
            {busy ? "Creating account…" : "Register"}
          </button>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </form>
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <div className="terms-overlay" role="dialog" aria-modal="true">
          <div className="terms-modal">
            <div className="terms-head">
              <h2>Membership Terms & Conditions</h2>
              <button
                className="terms-close"
                onClick={() => setShowTerms(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

          <div className="terms-body">
  <p>
    <strong>Last Updated:</strong> February 2025
  </p>

  <h3>1. Purpose of Membership</h3>
  <p>
    Membership at Holy Trinity Ethiopian Orthodox Tewahedo Church provides
    spiritual support, participation in liturgical life, and access to
    community programs, events, and services.
  </p>

  <h3>2. Member Responsibilities</h3>
  <ul>
    <li>Participate in the spiritual and community life of the parish.</li>
    <li>
      Respect clergy, leaders, volunteers, and fellow parishioners in all
      interactions.
    </li>
    <li>
      Keep your contact information up to date so that we can reach you with
      important announcements.
    </li>
  </ul>

  <h3>3. Financial Contributions</h3>
  <p>
    Members are encouraged to contribute according to their ability to support
    the church&apos;s ministries and operating costs. The finance team may
    establish recommended monthly, semi-annual, or annual plans.
  </p>

  <h3>4. Use of Information</h3>
  <p>
    Contact details you provide will only be used for parish communication,
    ministry coordination, and required administrative purposes. We do not sell
    your information.
  </p>

  <h3>5. Code of Conduct</h3>
  <p>
    Members are expected to uphold Christian values and avoid behavior that
    harms the peace, safety, or dignity of others in the community.
  </p>

  <h3>6. Changes to These Terms</h3>
  <p>
    These terms may be updated periodically by the parish council. When
    changes occur, a notice will be posted and the &quot;Last Updated&quot;
    date will be revised.
  </p>

  <p>
    If you have any questions about these terms, please contact the parish
    council or clergy for clarification before completing your registration.
  </p>
</div>


            <div className="terms-actions">
              <button
                type="button"
                className="terms-accept"
                onClick={() => {
                  upd("agree", true);
                  setShowTerms(false);
                }}
              >
                ✓ I Agree & Close
              </button>
              <button
                type="button"
                className="terms-cancel"
                onClick={() => setShowTerms(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

