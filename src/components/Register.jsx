import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const initial = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirm: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  dob: "",
  membershipType: "",
  baptized: "",
  howHeard: "",
  agree: false,
};

export default function Register() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();

  // --- Validation ---
  const validators = {
    firstName: (v) => (v.trim().length >= 2 ? "" : "Enter your first name."),
    lastName: (v) => (v.trim().length >= 2 ? "" : "Enter your last name."),
    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email.",
    phone: (v) =>
      /^[0-9+()\-\s]{7,20}$/.test(v) ? "" : "Enter a valid phone number.",
    password: (v) =>
      v.length >= 6 ? "" : "Password must be at least 6 characters.",
    confirm: (v) =>
      v === form.password ? "" : "Password confirmation does not match.",
    address: (v) => (v.trim() ? "" : "Enter your address."),
    city: (v) => (v.trim() ? "" : "Enter your city."),
    state: (v) => (v.trim() ? "" : "Enter your state."),
    zip: (v) => (v.trim() ? "" : "Enter your ZIP code."),
    dob: (v) => (v ? "" : "Select your date of birth."),
    membershipType: (v) => (v ? "" : "Select a membership type."),
    baptized: (v) => (v ? "" : "Select baptism status."),
    howHeard: (v) => (v ? "" : "Select how you heard about us."),
    agree: (v) => (v ? "" : "You must agree to the terms to register."),
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nextVal = type === "checkbox" ? checked : value;
    setForm((f) => ({ ...f, [name]: nextVal }));
    if (validators[name]) {
      setErrors((er) => ({ ...er, [name]: validators[name](nextVal) }));
    }
  };

  const validateAll = () => {
    const next = {};
    Object.keys(validators).forEach((k) => (next[k] = validators[k](form[k])));
    setErrors(next);
    return Object.values(next).every((x) => x === "");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setSubmitting(true);

    // TODO: replace with real API call
    setTimeout(() => {
      localStorage.setItem(
        "ht_user",
        JSON.stringify({
          ...form,
          agreedAt: new Date().toISOString(),
        })
      );
      setSubmitting(false);
      navigate("/");
    }, 800);
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">Create Church Member Account</h1>
        <p className="auth-sub">
          Join our parish community — your registration automatically includes
          church membership.
        </p>

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          {/* Personal Info */}
          <div className="auth-grid-2">
            <div className="auth-field">
              <label>First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={onChange}
                placeholder="e.g., Yohannes"
              />
              {errors.firstName && (
                <span className="auth-err">{errors.firstName}</span>
              )}
            </div>
            <div className="auth-field">
              <label>Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={onChange}
                placeholder="e.g., Tekle"
              />
              {errors.lastName && (
                <span className="auth-err">{errors.lastName}</span>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="auth-grid-2">
            <div className="auth-field">
              <label>Email</label>
              <input
                name="email"
                value={form.email}
                onChange={onChange}
                type="email"
                placeholder="name@example.com"
              />
              {errors.email && <span className="auth-err">{errors.email}</span>}
            </div>
            <div className="auth-field">
              <label>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                inputMode="tel"
                placeholder="+1 (615) 555-0123"
              />
              {errors.phone && <span className="auth-err">{errors.phone}</span>}
            </div>
          </div>

          {/* Address */}
          <div className="auth-field">
            <label>Address</label>
            <input
              name="address"
              value={form.address}
              onChange={onChange}
              placeholder="123 Main Street"
            />
            {errors.address && <span className="auth-err">{errors.address}</span>}
          </div>

          <div className="auth-grid-2">
            <div className="auth-field">
              <label>City</label>
              <input
                name="city"
                value={form.city}
                onChange={onChange}
                placeholder="City"
              />
              {errors.city && <span className="auth-err">{errors.city}</span>}
            </div>
            <div className="auth-field">
              <label>State</label>
              <input
                name="state"
                value={form.state}
                onChange={onChange}
                placeholder="State"
              />
              {errors.state && <span className="auth-err">{errors.state}</span>}
            </div>
          </div>

          <div className="auth-grid-2">
            <div className="auth-field">
              <label>ZIP Code</label>
              <input
                name="zip"
                value={form.zip}
                onChange={onChange}
                placeholder="12345"
              />
              {errors.zip && <span className="auth-err">{errors.zip}</span>}
            </div>
            <div className="auth-field">
              <label>Date of Birth</label>
              <input
                name="dob"
                type="date"
                value={form.dob}
                onChange={onChange}
              />
              {errors.dob && <span className="auth-err">{errors.dob}</span>}
            </div>
          </div>

          {/* Membership Info */}
          <div className="auth-grid-2">
            <div className="auth-field">
              <label>Membership Type</label>
              <select
                name="membershipType"
                value={form.membershipType}
                onChange={onChange}
              >
                <option value="">Select membership type</option>
                <option value="individual">Individual ($50/year)</option>
                <option value="family">Family ($100/year)</option>
                <option value="senior">Senior (65+) ($30/year)</option>
                <option value="student">Student ($25/year)</option>
              </select>
              {errors.membershipType && (
                <span className="auth-err">{errors.membershipType}</span>
              )}
            </div>

            <div className="auth-field">
              <label>Have you been baptized in the Orthodox faith?</label>
              <select
                name="baptized"
                value={form.baptized}
                onChange={onChange}
              >
                <option value="">Select one</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.baptized && (
                <span className="auth-err">{errors.baptized}</span>
              )}
            </div>
          </div>

          <div className="auth-field">
            <label>How did you hear about our church?</label>
            <select
              name="howHeard"
              value={form.howHeard}
              onChange={onChange}
            >
              <option value="">Select an option</option>
              <option value="family">Family/Friend</option>
              <option value="website">Website</option>
              <option value="social">Social Media</option>
              <option value="passing">Passing by</option>
              <option value="other">Other</option>
            </select>
            {errors.howHeard && (
              <span className="auth-err">{errors.howHeard}</span>
            )}
          </div>

          {/* Password */}
          <div className="auth-grid-2">
            <div className="auth-field">
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                placeholder="Create a password"
              />
              {errors.password && (
                <span className="auth-err">{errors.password}</span>
              )}
            </div>
            <div className="auth-field">
              <label>Confirm Password</label>
              <input
                name="confirm"
                type="password"
                value={form.confirm}
                onChange={onChange}
                placeholder="Re-enter password"
              />
              {errors.confirm && (
                <span className="auth-err">{errors.confirm}</span>
              )}
            </div>
          </div>

          {/* Terms */}
          <div className="auth-terms">
            <button
              type="button"
              className="terms-readmore"
              onClick={() => setShowTerms(true)}
            >
              Read Membership Terms & Conditions →
            </button>

            <label className="terms-check">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={onChange}
              />
              <span>I have read and agree to the Terms & Conditions.</span>
            </label>
            {errors.agree && (
              <div className="auth-err" style={{ marginTop: 6 }}>
                {errors.agree}
              </div>
            )}
          </div>

          <button className="auth-btn" disabled={submitting || !form.agree}>
            {submitting ? "Creating account…" : "Register"}
          </button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>

      {/* ---- Terms Modal ---- */}
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
  <p><strong>Last Updated:</strong> February 2025</p>

  <h3>1. Introduction</h3>
  <p>
    Welcome to Holy Trinity Ethiopian Orthodox Tewahedo Church. By becoming a church member,
    registering online, donating, or using this website, you agree to the following terms,
    policies, and responsibilities. These terms are designed to protect both the Church and
    its members in a respectful and Christ-centered manner.
  </p>

  <h3>2. Membership Eligibility</h3>
  <ul>
    <li>18+ years of age or parental consent for minors;</li>
    <li>Accept the faith and teachings of the Ethiopian Orthodox Tewahedo Church;</li>
    <li>Complete the Membership Form; and</li>
    <li>Agree to regular membership contributions.</li>
  </ul>

  <h3>3. Membership Contributions / Financial Obligations</h3>
  <ul>
    <li>Fees support operations, priest services, programs, and facilities.</li>
    <li>Payments may be monthly, quarterly, or annually.</li>
    <li>Donations are generally non-refundable; exceptions require leadership approval.</li>
    <li>Members are responsible for any tax treatment (consult your tax advisor).</li>
  </ul>

  <h3>4. Member Responsibilities</h3>
  <ul>
    <li>Uphold Orthodox faith and traditions; maintain respectful conduct.</li>
    <li>Participate in liturgy and community life as able.</li>
    <li>Care for church property and foster peace in the community.</li>
    <li>Keep your contact details up to date.</li>
  </ul>

  <h3>5. Church Rights & Governance</h3>
  <p>
    The Church may accept, decline, or revoke membership for serious violations of Church teaching or
    misconduct. Governance follows the Holy Synod, Archdiocese, and Church bylaws. Concerns should be
    addressed respectfully through Church administration.
  </p>

  <h3>6. Privacy & Personal Information</h3>
  <p>
    Personal data is used only for church communications and records, not sold to third parties.
    Members may request updates or removal by contacting the administration.
  </p>

  <h3>7. Website & Online Services</h3>
  <p>
    Do not misuse the website. Church photos, sermons, and materials are church property and may not be
    redistributed without permission. The church is not responsible for temporary outages or external links.
  </p>

  <h3>8. Liability Disclaimer</h3>
  <p>
    The church is not responsible for personal injury, theft, or loss during events unless due to proven
    negligence. Participation in trips or volunteer activities is at one’s own risk.
  </p>

  <h3>9. Cancellation or Withdrawal</h3>
  <p>
    Members may cancel membership at any time with written notice. Outstanding financial obligations should
    be resolved prior to cancellation.
  </p>

  <h3>10. Agreement</h3>
  <p>
    By submitting the Membership Form, attending services, or supporting the church financially, you confirm
    that you have read, understood, and agree to these terms.
  </p>
</div>


            <div className="terms-actions">
              <button
                type="button"
                className="terms-accept"
                onClick={() => {
                  setForm((f) => ({ ...f, agree: true }));
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
