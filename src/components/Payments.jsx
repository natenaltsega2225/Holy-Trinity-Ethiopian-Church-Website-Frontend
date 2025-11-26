

// // src/components/Payments.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate, Link, useSearchParams } from "react-router-dom";
// import api from "./api";
// import "../styles/payment.css";

// // Fallback if API not reachable
// const FALLBACK_PLANS = [
//   {
//     code: "monthly",
//     label: "Month-to-Month (1 month)",
//     months: 1,
//     min_amount_cents: 2500,
//     default_amount_cents: 2500,
//   },
//   {
//     code: "semi_annual",
//     label: "6 Months (one-time total)",
//     months: 6,
//     min_amount_cents: 15000,
//     default_amount_cents: 15000,
//   },
//   {
//     code: "annual",
//     label: "12 Months (one-time total)",
//     months: 12,
//     min_amount_cents: 30000,
//     default_amount_cents: 30000,
//   },
// ];

// export default function Payments() {
//   const [plans, setPlans] = useState(FALLBACK_PLANS);
//   const [planCode, setPlanCode] = useState("monthly");
//   const [monthlyAmount, setMonthlyAmount] = useState(25);
//   const [sp] = useSearchParams();
//   const nav = useNavigate();
//   const [err, setErr] = useState("");

//   // ❌ Removed "Require login" redirect so guests can see this section

//   // Load plans from backend
//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await api.get("/dues/plans");
//         if (Array.isArray(data.plans) && data.plans.length) {
//           setPlans(data.plans);
//           const first = data.plans[0];
//           setPlanCode(first.code);
//           setMonthlyAmount(
//             (first.default_amount_cents ||
//               first.min_amount_cents ||
//               2500) /
//               (first.months || 1) /
//               100
//           );
//         }
//       } catch (e) {
//         console.error("Could not load dues plans", e);
//         setErr("Using fallback dues plans (finance config not reachable).");
//       }
//     })();
//   }, []);

//   const plan = useMemo(
//     () => plans.find((p) => p.code === planCode) || plans[0],
//     [plans, planCode]
//   );

//   // plan minimum per month in USD
//   const minPerMonthUsd = useMemo(() => {
//     if (!plan) return 0;
//     const totalMin = (plan.min_amount_cents || 0) / 100;
//     return Math.max(0, totalMin / (plan.months || 1));
//   }, [plan]);

//   // Total = user-entered monthly amount * months (but never below minimum)
//   const safeMonthly = useMemo(() => {
//     const raw = Number(monthlyAmount) || 0;
//     return Math.max(minPerMonthUsd, raw);
//   }, [monthlyAmount, minPerMonthUsd]);

//   const total = useMemo(() => {
//     if (!plan) return 0;
//     return Math.round(safeMonthly * plan.months);
//   }, [safeMonthly, plan]);

//   const goCheckout = () => {
//     const desc = `Membership Dues — ${plan.months} month${
//       plan.months > 1 ? "s" : ""
//     }`;

//     nav(
//       `/checkout?amount=${total}&months=${plan.months}` +
//         `&desc=${encodeURIComponent(desc)}`
//     );
//   };

//   if (!plan) return null;

//   return (
//     <section className="payments-wrap" id="payments">
//       <h2>Membership Dues</h2>
//       <p>
//         Choose a plan and pay your dues online. Amounts are set by the Finance
//         team.
//       </p>

//       {sp.get("status") === "success" && (
//         <div className="auth-banner" role="status">
//           Thank you! Your payment was successful.
//         </div>
//       )}
//       {sp.get("status") === "cancel" && (
//         <div className="auth-banner" role="status">
//           Payment canceled.
//         </div>
//       )}
//       {err && (
//         <div className="auth-banner" role="alert">
//           {err}
//         </div>
//       )}

//       <div className="payments-card">
//         <div className="grid">
//           <label className="auth-field">
//             <span>Monthly Amount (USD)</span>
//             <input
//               type="number"
//               min={minPerMonthUsd.toFixed(2)}
//               step="1"
//               value={safeMonthly}
//               onChange={(e) => setMonthlyAmount(e.target.value)}
//               className="amount-input"
//             />
//             <small>
//               Minimum for this plan:{" "}
//               <strong>${minPerMonthUsd.toFixed(2)} / month</strong>
//             </small>
//           </label>

//           <div className="auth-field">
//             <span className="plan-label">Plan</span>
//             <div className="plan-grid">
//               {plans.map((p) => (
//                 <label
//                   key={p.code}
//                   className={`plan-option ${
//                     planCode === p.code ? "is-active" : ""
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="plan"
//                     value={p.code}
//                     checked={planCode === p.code}
//                     onChange={() => setPlanCode(p.code)}
//                   />
//                   <span>{p.label}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div className="summary">
//             Total Due Now: <strong>${total.toLocaleString()}</strong>{" "}
//             ({plan.months} month{plan.months > 1 ? "s" : ""})
//           </div>
//         </div>

//         <div className="pay-actions">
//           <button
//             className="cta-stripe"
//             disabled={total < 1}
//             onClick={goCheckout}
//           >
//             Continue to Checkout
//           </button>
//         </div>

//         <p className="note">
//           Not a member yet? <Link to="/register">Register</Link>
//         </p>
//       </div>
//     </section>
//   );
// }

// src/components/Payments.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/payment.css";

export default function Payments() {
  const nav = useNavigate();

  const goToCheckout = () => {
    nav("/checkout");
  };

  return (
    <section className="payments-wrap" id="payments">
      <div className="payments-container">
        <h2 className="payments-title">Membership Dues & Online Giving</h2>
        <p className="payments-sub">
          Support Holy Trinity Ethiopian Orthodox Tewahedo Church through secure
          online membership dues. Choose a plan that fits your family and complete
          your contribution using Stripe&apos;s secure checkout.
        </p>

        <div className="payments-cards">
          <div className="payments-card">
            <div className="payments-card-icon" aria-hidden>
              💳
            </div>
            <h3 className="payments-card-title">Membership Contributions</h3>
            <p className="payments-card-desc">
              Select from monthly, 6-month, or annual membership plans on the next
              page. All payments are processed securely by Stripe.
            </p>

            <button
              type="button"
              className="cta-stripe"
              onClick={goToCheckout}
              style={{ marginTop: "1.25rem" }}
            >
              Choose Membership Plan
            </button>
          </div>

          <div className="payments-card">
            <div className="payments-card-icon" aria-hidden>
              🕊️
            </div>
            <h3 className="payments-card-title">How Stripe Works</h3>
            <p className="payments-card-desc">
              You will be redirected to a secure Stripe checkout page to enter
              your card or bank information. The church does <strong>not</strong>{" "}
              store your card numbers in our database.
            </p>
            <p className="payments-card-desc" style={{ marginTop: "0.5rem" }}>
              You&apos;ll receive an email receipt for every contribution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

