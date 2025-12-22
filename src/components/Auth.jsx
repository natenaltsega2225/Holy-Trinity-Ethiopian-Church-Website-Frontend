// //src/components/Auth.jsx
// import React, { useMemo, useState } from "react";
// import { useLocation, useNavigate, Link } from "react-router-dom";
// import "../styles/auth.css";

// function useInitialMode() {
//   const { pathname } = useLocation();
//   return useMemo(
//     () => (pathname.toLowerCase().includes("register") ? "register" : "login"),
//     [pathname]
//   );
// }

// const initialReg = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   phone: "",
//   password: "",
//   confirm: "",
//   agree: false,
// };

// export default function Auth() {
//   const navigate = useNavigate();
//   const initialMode = useInitialMode();
//   const [mode, setMode] = useState(initialMode);

//   // login state
//   const [email, setEmail] = useState("");
//   const [pw, setPw] = useState("");
//   const [loginErr, setLoginErr] = useState("");
//   const [loading, setLoading] = useState(false);

//   // register state
//   const [form, setForm] = useState(initialReg);
//   const [errors, setErrors] = useState({});
//   const [showTerms, setShowTerms] = useState(false);

//   // validators (same rules as before)
//   const validators = {
//     firstName: (v) => (v.trim().length >= 2 ? "" : "Enter your first name."),
//     lastName: (v) => (v.trim().length >= 2 ? "" : "Enter your last name."),
//     email: (v) =>
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email.",
//     phone: (v) =>
//       /^[0-9+()\-\s]{7,20}$/.test(v) ? "" : "Enter a valid phone number.",
//     password: (v) =>
//       v.length >= 6 ? "" : "Password must be at least 6 characters.",
//     confirm: (v) =>
//       v === form.password ? "" : "Password confirmation does not match.",
//     agree: (v) => (v ? "" : "You must agree to the terms to register."),
//   };

//   const onRegChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const nextVal = type === "checkbox" ? checked : value;
//     setForm((f) => ({ ...f, [name]: nextVal }));
//     if (validators[name]) {
//       setErrors((er) => ({ ...er, [name]: validators[name](nextVal) }));
//     }
//   };

//   const validateAll = () => {
//     const next = {};
//     Object.keys(validators).forEach((k) => (next[k] = validators[k](form[k])));
//     setErrors(next);
//     return Object.values(next).every((x) => x === "");
//   };

//   /* -------- LOGIN submit -------- */
//   const submitLogin = (e) => {
//     e.preventDefault();
//     setLoginErr("");
//     if (!email || !pw) {
//       setLoginErr("Please enter your email and password.");
//       return;
//     }
//     setLoading(true);

//     // TODO: replace with real API call
//     setTimeout(() => {
//       const saved = localStorage.getItem("ht_user");
//       if (!saved) {
//         setLoginErr("No account found. Please register first.");
//         setLoading(false);
//         return;
//       }
//       localStorage.setItem("ht_session", JSON.stringify({ email, ts: Date.now() }));
//       setLoading(false);
//       navigate("/");
//     }, 550);
//   };

//   /* -------- REGISTER submit -------- */
//   const submitRegister = (e) => {
//     e.preventDefault();
//     if (!validateAll()) return;
//     setLoading(true);

//     // TODO: replace with real API call
//     setTimeout(() => {
//       localStorage.setItem(
//         "ht_user",
//         JSON.stringify({
//           firstName: form.firstName.trim(),
//           lastName: form.lastName.trim(),
//           email: form.email.trim(),
//           phone: form.phone.trim(),
//           agreedAt: new Date().toISOString(),
//         })
//       );
//       setLoading(false);
//       navigate("/");
//     }, 650);
//   };

//   /* -------- UI -------- */
//   return (
//     <div className="auth-wrap">
//       <div className="auth-card">
//         {/* Tabs (keeps same style language) */}
//         <div className="auth-tabs">
//           <button
//             className={`auth-tab ${mode === "login" ? "auth-tab-active" : ""}`}
//             onClick={() => setMode("login")}
//           >
//             Login
//           </button>
//           <button
//             className={`auth-tab ${mode === "register" ? "auth-tab-active" : ""}`}
//             onClick={() => setMode("register")}
//           >
//             Register
//           </button>
//         </div>

//         {mode === "login" ? (
//           <>
//             <h1 className="auth-title">Sign In</h1>
//             <p className="auth-sub">Welcome back. Please enter your credentials.</p>

//             <form className="auth-form" onSubmit={submitLogin} noValidate>
//               <div className="auth-field">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   autoComplete="email"
//                   placeholder="name@example.com"
//                 />
//               </div>
//               <div className="auth-field">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   value={pw}
//                   onChange={(e) => setPw(e.target.value)}
//                   autoComplete="current-password"
//                   placeholder="Your password"
//                 />
//               </div>

//               {loginErr && <div className="auth-banner">{loginErr}</div>}

//               <button className="auth-btn" disabled={loading}>
//                 {loading ? "Signing in…" : "Login"}
//               </button>

//               <div className="auth-help-row">
//                 <a href="#" className="auth-link">Forgot Password</a>
//               </div>

//               <p className="auth-switch">
//                 Don't have an account?{" "}
//                 <button
//                   type="button"
//                   className="auth-link-btn"
//                   onClick={() => setMode("register")}
//                 >
//                   Sign up
//                 </button>
//               </p>
//             </form>
//           </>
//         ) : (
//           <>
//             <h1 className="auth-title">Create Account</h1>
//             <p className="auth-sub">
//               Join our parish portal to receive updates and access member resources.
//             </p>

//             <form className="auth-form" onSubmit={submitRegister} noValidate>
//               <div className="auth-grid-2">
//                 <div className="auth-field">
//                   <label>First Name</label>
//                   <input
//                     name="firstName"
//                     value={form.firstName}
//                     onChange={onRegChange}
//                     autoComplete="given-name"
//                     placeholder="e.g., Yohannes"
//                   />
//                   {errors.firstName && <span className="auth-err">{errors.firstName}</span>}
//                 </div>
//                 <div className="auth-field">
//                   <label>Last Name</label>
//                   <input
//                     name="lastName"
//                     value={form.lastName}
//                     onChange={onRegChange}
//                     autoComplete="family-name"
//                     placeholder="e.g., Tekle"
//                   />
//                   {errors.lastName && <span className="auth-err">{errors.lastName}</span>}
//                 </div>
//               </div>

//               <div className="auth-grid-2">
//                 <div className="auth-field">
//                   <label>Email</label>
//                   <input
//                     name="email"
//                     value={form.email}
//                     onChange={onRegChange}
//                     type="email"
//                     autoComplete="email"
//                     placeholder="name@example.com"
//                   />
//                   {errors.email && <span className="auth-err">{errors.email}</span>}
//                 </div>
//                 <div className="auth-field">
//                   <label>Phone</label>
//                   <input
//                     name="phone"
//                     value={form.phone}
//                     onChange={onRegChange}
//                     inputMode="tel"
//                     placeholder="+1 (615) 555-0123"
//                   />
//                   {errors.phone && <span className="auth-err">{errors.phone}</span>}
//                 </div>
//               </div>

//               <div className="auth-grid-2">
//                 <div className="auth-field">
//                   <label>Password</label>
//                   <input
//                     name="password"
//                     value={form.password}
//                     onChange={onRegChange}
//                     type="password"
//                     autoComplete="new-password"
//                     placeholder="Create a password"
//                   />
//                   {errors.password && <span className="auth-err">{errors.password}</span>}
//                 </div>
//                 <div className="auth-field">
//                   <label>Confirm Password</label>
//                   <input
//                     name="confirm"
//                     value={form.confirm}
//                     onChange={onRegChange}
//                     type="password"
//                     autoComplete="new-password"
//                     placeholder="Re-enter password"
//                   />
//                   {errors.confirm && <span className="auth-err">{errors.confirm}</span>}
//                 </div>
//               </div>

//               {/* Terms row */}
//               <div className="auth-terms">
//                 <button
//                   type="button"
//                   className="terms-readmore"
//                   onClick={() => setShowTerms(true)}
//                   aria-haspopup="dialog"
//                   aria-expanded={showTerms}
//                 >
//                   Read Membership Terms & Conditions →
//                 </button>

//                 <label className="terms-check">
//                   <input
//                     type="checkbox"
//                     name="agree"
//                     checked={form.agree}
//                     onChange={onRegChange}
//                   />
//                   <span>I have read and agree to the Terms & Conditions.</span>
//                 </label>

//                 {errors.agree && <div className="auth-err" style={{marginTop:6}}>{errors.agree}</div>}
//               </div>

//               <button className="auth-btn" disabled={loading || !form.agree}>
//                 {loading ? "Creating account…" : "Register"}
//               </button>

//               <p className="auth-switch">
//                 Already have an account?{" "}
//                 <button
//                   type="button"
//                   className="auth-link-btn"
//                   onClick={() => setMode("login")}
//                 >
//                   Sign in
//                 </button>
//               </p>
//             </form>
//           </>
//         )}
//       </div>

//       {/* Terms Modal (same as before) */}
//       {showTerms && (
//         <div className="terms-overlay" role="dialog" aria-modal="true">
//           <div className="terms-modal">
//             <div className="terms-head">
//               <h2>Membership Terms & Conditions</h2>
//               <button className="terms-close" onClick={() => setShowTerms(false)} aria-label="Close">✕</button>
//             </div>

//             <div className="terms-body">
//               <p><strong>Last Updated:</strong> February 2025</p>
//               <h3>1. Introduction</h3>
//               <p>
//                 Welcome to Holy Trinity Ethiopian Orthodox Tewahedo Church. By becoming a church member,
//                 registering online, donating, or using this website, you agree to the following terms,
//                 policies, and responsibilities.
//               </p>
//               <h3>2. Membership Eligibility</h3>
//               <ul>
//                 <li>18+ or parental consent for minors</li>
//                 <li>Accept Orthodox faith & teachings</li>
//                 <li>Complete Membership Form</li>
//                 <li>Agree to membership contributions</li>
//               </ul>
//               <h3>3. Contributions / Financial</h3>
//               <ul>
//                 <li>Support operations, services, programs, facilities</li>
//                 <li>Monthly/quarterly/annual schedules allowed</li>
//                 <li>Generally non-refundable; exceptions require approval</li>
//               </ul>
//               <h3>4. Member Responsibilities</h3>
//               <ul>
//                 <li>Uphold faith, respect community & property</li>
//                 <li>Participate as able, keep contact details updated</li>
//               </ul>
//               <h3>5–10.</h3>
//               <p>Church governance, privacy, website use, liability, cancellation, and agreement—see full policy above.</p>
//             </div>

//             <div className="terms-actions">
//               <button
//                 type="button"
//                 className="terms-accept"
//                 onClick={() => { setForm((f)=>({...f, agree: true})); setShowTerms(false); }}
//               >
//                 ✓ I Agree & Close
//               </button>
//               <button type="button" className="terms-cancel" onClick={() => setShowTerms(false)}>
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// src/components/Auth.jsx
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";
import api, { getBaseURL } from "./api";
import { useAuth, landingForRole } from "../hooks/useAuth";

function useInitialMode() {
  const { pathname } = useLocation();
  return useMemo(
    () => (pathname.toLowerCase().includes("register") ? "register" : "login"),
    [pathname]
  );
}

const initialReg = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirm: "",
  agree: false,
};

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const initialMode = useInitialMode();
  const [mode, setMode] = useState(initialMode);

  // login state
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loginErr, setLoginErr] = useState("");

  // register state
  const [form, setForm] = useState(initialReg);
  const [errors, setErrors] = useState({});
  const [regErr, setRegErr] = useState("");

  // shared
  const [loading, setLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // redirect target if they came from a protected page
  const nextParam = new URLSearchParams(location.search).get("next");
  const cameFromState = !!location.state?.from;

  function afterLoginRedirect(user) {
    if (nextParam) return nextParam;
    return landingForRole(user?.role);
  }

  // validators
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
    agree: (v) => (v ? "" : "You must agree to the terms to register."),
  };

  const onRegChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nextVal = type === "checkbox" ? checked : value;
    setForm((f) => ({ ...f, [name]: nextVal }));
    if (validators[name]) {
      setErrors((er) => ({ ...er, [name]: validators[name](nextVal) }));
    }
  };

  const validateAll = () => {
    const next = {};
    Object.keys(validators).forEach((k) => {
      next[k] = validators[k](form[k]);
    });
    setErrors(next);
    return Object.values(next).every((x) => x === "");
  };

  /* -------- LOGIN submit (real API) -------- */
  const submitLogin = async (e) => {
    e.preventDefault();
    setLoginErr("");
    setRegErr("");

    if (!email || !pw) {
      setLoginErr("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post(
        "/auth/login",
        { email, password: pw },
        { withCredentials: false }
      );

      if (!data?.token) {
        throw new Error("Invalid response from server.");
      }

      // Save in auth context
      auth?.setToken?.(data.token);
      auth?.setUser?.(data.user || null);

      // Persist in localStorage
      try {
        localStorage.setItem("ht_token", data.token);
        localStorage.setItem("ht_user", JSON.stringify(data.user || null));
      } catch (storageErr) {
        console.warn("Could not persist login in localStorage:", storageErr);
      }

      navigate(afterLoginRedirect(data.user), {
        replace: cameFromState || !!nextParam,
      });
    } catch (e2) {
      console.error("Login error:", e2);
      if (!e2.response) {
        const base = getBaseURL();
        setLoginErr(
          `Cannot reach the API (network/CORS). Check that the backend is running at ${base}.`
        );
      } else if (e2.response.status === 401) {
        setLoginErr("Incorrect email or password.");
      } else {
        setLoginErr(
          e2.response?.data?.error ||
            e2.response?.data?.message ||
            "Login failed."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /* -------- REGISTER submit (real API) -------- */
  const submitRegister = async (e) => {
    e.preventDefault();
    setRegErr("");
    setLoginErr("");

    if (!validateAll()) return;

    setLoading(true);
    try {
      const payload = {
        name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
        email: form.email.trim(),
        password: form.password,
        phone: form.phone.trim(),
        // you can add role if your backend accepts it (e.g., "member")
      };

      const { data } = await api.post(
        "/auth/register",
        payload,
        { withCredentials: false }
      );

      if (!data?.token) {
        throw new Error("Invalid response from server.");
      }

      // Save in auth context
      auth?.setToken?.(data.token);
      auth?.setUser?.(data.user || null);

      // Persist in localStorage
      try {
        localStorage.setItem("ht_token", data.token);
        localStorage.setItem("ht_user", JSON.stringify(data.user || null));
      } catch (storageErr) {
        console.warn("Could not persist user in localStorage:", storageErr);
      }

      navigate(afterLoginRedirect(data.user), { replace: true });
    } catch (e2) {
      console.error("Register error:", e2);
      if (!e2.response) {
        const base = getBaseURL();
        setRegErr(
          `Cannot reach the API (network/CORS). Check that the backend is running at ${base}.`
        );
      } else if (e2.response.status === 409) {
        setRegErr("An account with this email already exists.");
      } else {
        setRegErr(
          e2.response?.data?.error ||
            e2.response?.data?.message ||
            "Registration failed."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /* -------- UI -------- */
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === "login" ? "auth-tab-active" : ""}`}
            type="button"
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`auth-tab ${
              mode === "register" ? "auth-tab-active" : ""
            }`}
            type="button"
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {mode === "login" ? (
          <>
            <h1 className="auth-title">Sign In</h1>
            <p className="auth-sub">
              Welcome back. Please enter your credentials.
            </p>

            <form className="auth-form" onSubmit={submitLogin} noValidate>
              <div className="auth-field">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="name@example.com"
                />
              </div>
              <div className="auth-field">
                <label>Password</label>
                <input
                  type="password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Your password"
                />
              </div>

              {loginErr && <div className="auth-banner">{loginErr}</div>}

              <button className="auth-btn" disabled={loading}>
                {loading ? "Signing in…" : "Login"}
              </button>

              <div className="auth-help-row">
                <Link to="/forgot-password" className="auth-link">
                  Forgot Password
                </Link>
              </div>

              <p className="auth-switch">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => setMode("register")}
                >
                  Sign up
                </button>
              </p>
            </form>
          </>
        ) : (
          <>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-sub">
              Join our parish portal to receive updates and access member
              resources.
            </p>

            <form className="auth-form" onSubmit={submitRegister} noValidate>
              <div className="auth-grid-2">
                <div className="auth-field">
                  <label>First Name</label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={onRegChange}
                    autoComplete="given-name"
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
                    onChange={onRegChange}
                    autoComplete="family-name"
                    placeholder="e.g., Tekle"
                  />
                  {errors.lastName && (
                    <span className="auth-err">{errors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="auth-grid-2">
                <div className="auth-field">
                  <label>Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={onRegChange}
                    type="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                  />
                  {errors.email && (
                    <span className="auth-err">{errors.email}</span>
                  )}
                </div>
                <div className="auth-field">
                  <label>Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onRegChange}
                    inputMode="tel"
                    placeholder="+1 (615) 555-0123"
                  />
                  {errors.phone && (
                    <span className="auth-err">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="auth-grid-2">
                <div className="auth-field">
                  <label>Password</label>
                  <input
                    name="password"
                    value={form.password}
                    onChange={onRegChange}
                    type="password"
                    autoComplete="new-password"
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
                    value={form.confirm}
                    onChange={onRegChange}
                    type="password"
                    autoComplete="new-password"
                    placeholder="Re-enter password"
                  />
                  {errors.confirm && (
                    <span className="auth-err">{errors.confirm}</span>
                  )}
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
                    name="agree"
                    checked={form.agree}
                    onChange={onRegChange}
                  />
                  <span>
                    I have read and agree to the Terms &amp; Conditions.
                  </span>
                </label>

                {errors.agree && (
                  <div className="auth-err" style={{ marginTop: 6 }}>
                    {errors.agree}
                  </div>
                )}
              </div>

              {regErr && <div className="auth-banner">{regErr}</div>}

              <button
                className="auth-btn"
                disabled={loading || !form.agree}
              >
                {loading ? "Creating account…" : "Register"}
              </button>

              <p className="auth-switch">
                Already have an account?{" "}
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => setMode("login")}
                >
                  Sign in
                </button>
              </p>
            </form>
          </>
        )}
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <div className="terms-overlay" role="dialog" aria-modal="true">
          <div className="terms-modal">
            <div className="terms-head">
              <h2>Membership Terms &amp; Conditions</h2>
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
              <h3>1. Introduction</h3>
              <p>
                Welcome to Holy Trinity Ethiopian Orthodox Tewahedo Church. By
                becoming a church member, registering online, donating, or using
                this website, you agree to the following terms, policies, and
                responsibilities.
              </p>
              <h3>2. Membership Eligibility</h3>
              <ul>
                <li>18+ or parental consent for minors</li>
                <li>Accept Orthodox faith &amp; teachings</li>
                <li>Complete Membership Form</li>
                <li>Agree to membership contributions</li>
              </ul>
              <h3>3. Contributions / Financial</h3>
              <ul>
                <li>Support operations, services, programs, facilities</li>
                <li>Monthly/quarterly/annual schedules allowed</li>
                <li>Generally non-refundable; exceptions require approval</li>
              </ul>
              <h3>4. Member Responsibilities</h3>
              <ul>
                <li>Uphold faith, respect community &amp; property</li>
                <li>Participate as able, keep contact details updated</li>
              </ul>
              <h3>5–10.</h3>
              <p>
                Church governance, privacy, website use, liability, cancellation,
                and agreement—see full policy above.
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
                ✓ I Agree &amp; Close
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
