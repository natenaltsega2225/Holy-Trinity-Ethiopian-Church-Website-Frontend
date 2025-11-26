// // src/components/Checkout.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   PaymentElement,
//   AddressElement,
//   LinkAuthenticationElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import api from "../components/api";
// import "../styles/checkout.css";

// /** Publishable key from frontend .env (trim to avoid stray spaces/newlines) */
// const pk = (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "").trim();

// /* Visual card brand strip (icons only) */
// function CardBrandStrip() {
//   return (
//     <div className="ck-brands" aria-hidden="true">
//       <svg viewBox="0 0 40 24"><circle cx="12" cy="12" r="10" fill="#1a1f71"/><rect x="21" y="6" width="14" height="12" rx="2" fill="#00529b"/></svg>
//       <svg viewBox="0 0 40 24"><circle cx="12" cy="12" r="10" fill="#eb001b"/><circle cx="22" cy="12" r="10" fill="#f79e1b" opacity=".8"/></svg>
//       <svg viewBox="0 0 40 24"><rect x="6" y="6" width="28" height="12" rx="2" fill="#2e77bc"/><text x="20" y="15" textAnchor="middle" fontSize="8" fill="#fff">AMEX</text></svg>
//       <svg viewBox="0 0 40 24"><rect x="6" y="6" width="28" height="12" rx="2" fill="#1a1f71"/><text x="20" y="15" textAnchor="middle" fontSize="8" fill="#fff">DEBIT</text></svg>
//     </div>
//   );
// }

// function CheckoutInner({ amount, description, planMonths }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const nav = useNavigate();
//   const [email, setEmail] = useState("");
//   const [busy, setBusy] = useState(false);
//   const [err, setErr] = useState("");

//   const totalText = useMemo(() => `$${Number(amount).toLocaleString()}`, [amount]);
//   const monthsSafe = Math.max(1, Number(planMonths || 1));
//   const monthlyRate = useMemo(
//     () => `$${(Number(amount) / monthsSafe).toFixed(2)}`,
//     [amount, monthsSafe]
//   );

//   async function handlePay(e) {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setErr("");
//     setBusy(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: window.location.origin + "/payments?status=success",
//         receipt_email: email || undefined,
//       },
//       redirect: "if_required",
//     });

//     if (error) {
//       setErr(error.message || "Payment failed");
//       setBusy(false);
//       return;
//     }

//     nav("/payments?status=success");
//   }

//   return (
//     <div className="ck-page">
//       <div className="ck-shell">
//         <header className="ck-header">
//           <button className="ck-back" onClick={() => nav(-1)} aria-label="Back">←</button>
//           <h1>Checkout</h1>
//         </header>

//         <div className="ck-layout">
//           {/* Left: form */}
//           <section className="ck-left">
//             <form onSubmit={handlePay} className="ck-card">
//               <div className="ck-section">
//                 <h3>Email</h3>
//                 <LinkAuthenticationElement
//                   onChange={(e) => setEmail(e.value.email)}
//                   options={{ defaultValues: { email } }}
//                 />
//               </div>

//               <div className="ck-section">
//                 <h3>Payment</h3>
//                 <CardBrandStrip />
//                 {/* Cards, Link, wallets and ACH (if enabled in PI) */}
//                 <PaymentElement />
//               </div>

//               <div className="ck-section">
//                 <h3>Billing address</h3>
//                 <AddressElement options={{ mode: "billing" }} />
//               </div>

//               {err && <div className="ck-banner" role="alert">{err}</div>}

//               <button className="ck-pay" disabled={!stripe || !elements || busy}>
//                 {busy ? "Processing…" : `Pay ${totalText} Now`}
//               </button>

//               <p className="ck-footnote">
//                 Your payment info is securely stored by Stripe. We do not store card numbers.
//               </p>
//             </form>
//           </section>

//           {/* Right: summary */}
//           <aside className="ck-right ck-card ck-summary">
//   <header className="ck-sum-head">
//     <div className="ck-sum-brand">
//       <span className="ck-sum-logo" aria-hidden>🕊️</span>
//       <div>
//         <h2 className="ck-sum-title">Holy Trinity EOTC — Nashville</h2>
//         <p className="ck-sum-sub">Membership Contribution</p>
//       </div>
//     </div>

//     <div className="ck-sum-price">
//       <div className="ck-sum-amount">{totalText}</div>
//       <div className="ck-sum-badges">
//         <span className="badge badge--plan">
//           {monthsSafe} {monthsSafe > 1 ? "months" : "month"}
//         </span>
//         <span className="badge badge--monthly">{monthlyRate}/mo</span>
//       </div>
//     </div>
//   </header>

//   <div className="ck-sum-divider" role="separator" />

//   <dl className="ck-sum-specs">
//     <div className="ck-spec">
//       <dt>Description</dt>
//       <dd>{description}</dd>
//     </div>
//     <div className="ck-spec">
//       <dt>Duration</dt>
//       <dd>{monthsSafe} {monthsSafe > 1 ? "months" : "month"}</dd>
//     </div>
//     <div className="ck-spec total">
//       <dt>Total Due</dt>
//       <dd className="ck-sum-total">{totalText}</dd>
//     </div>
//   </dl>

//   <div className="ck-sum-trust">
//     <div className="ck-trust-item">
//       <span className="ck-trust-ico" aria-hidden>🔒</span>
//       <span>SSL Secured by Stripe</span>
//     </div>
//     <div className="ck-trust-item">
//       <span className="ck-trust-ico" aria-hidden>💳</span>
//       <span>Visa • Mastercard • AMEX • Debit • ACH (US)</span>
//     </div>
//     <div className="ck-trust-item">
//       <span className="ck-trust-ico" aria-hidden>🧾</span>
//       <span>Email receipt & renewal reminders</span>
//     </div>
//   </div>

//   <footer className="ck-sum-foot">
//     <p>
//       <span aria-hidden>🙏</span>{" "}
//       Thank you for supporting Holy Trinity Ethiopian Orthodox Tewahedo Church.
//     </p>
//   </footer>
// </aside>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default function CheckoutPage() {
//   const [sp] = useSearchParams();
//   const amount = Math.max(1, Number(sp.get("amount") || 0));
//   const description = sp.get("desc") || "Membership Dues";
//   const planMonths = Math.max(1, Number(sp.get("months") || 1)); // 👈 read months from URL

//   const [clientSecret, setClientSecret] = useState("");
//   const [err, setErr] = useState("");

//   /** Toggle ACH (US bank account) here */
//   const allowAch = true;

//   if (!pk) {
//     return (
//       <div className="ck-page">
//         <div className="ck-shell">
//           <div className="ck-banner">
//             Missing <code>VITE_STRIPE_PUBLISHABLE_KEY</code> in your frontend .env. Add it and restart Vite.
//           </div>
//         </div>
//       </div>
//     );
//   }

//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await api.post("/dues/create-payment-intent", {
//           amount_cents: amount * 100,
//           description,
//           allow_ach: allowAch,
//         });
//         setClientSecret(data.clientSecret);
//       } catch (e) {
//         console.error(e);
//         setErr(e.response?.data?.error || "Could not start checkout.");
//       }
//     })();
//   }, [amount, description, allowAch]);

//   if (err) {
//     return (
//       <div className="ck-page">
//         <div className="ck-shell"><div className="ck-banner">{err}</div></div>
//       </div>
//     );
//   }
//   if (!clientSecret) return null;

//   const stripePromise = loadStripe(pk);
//   const appearance = {
//     theme: "stripe",
//     variables: {
//       colorPrimary: "#123A78",
//       colorBackground: "#ffffff",
//       colorText: "#0f2340",
//       borderRadius: "12px",
//     },
//   };

//   return (
//     <Elements
//       stripe={stripePromise}
//       options={{
//         clientSecret,
//         appearance,
//         paymentMethodOrder: allowAch
//           ? ["card", "us_bank_account", "link"]
//           : ["card", "link"],
//       }}
//     >
//       <CheckoutInner
//         amount={amount}
//         description={description}
//         planMonths={planMonths}   // 👈 pass it down
//       />
//     </Elements>
//   );
// }


// src/components/Checkout.jsx
// src/components/Checkout.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../components/api";
import "../styles/checkout.css";

export default function CheckoutPage() {
  const nav = useNavigate();

  const [plans, setPlans] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  // Load plans from backend
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data } = await api.get("/dues/plans");
        if (!mounted) return;
        if (Array.isArray(data.plans) && data.plans.length) {
          setPlans(data.plans);
          setSelectedCode(data.plans[0].code); // default to first plan
        } else {
          setErr("No active membership plans are configured.");
        }
      } catch (e) {
        console.error("Could not load dues plans", e);
        if (mounted) {
          setErr("Unable to load membership plans. Please try again later.");
        }
      } finally {
        if (mounted) setLoadingPlans(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const selectedPlan = useMemo(
    () => plans.find((p) => p.code === selectedCode) || null,
    [plans, selectedCode]
  );

  const totalAmount = useMemo(() => {
    if (!selectedPlan) return 0;
    const cents =
      Number(selectedPlan.default_amount_cents) ||
      Number(selectedPlan.min_amount_cents) ||
      0;
    return cents / 100;
  }, [selectedPlan]);

  const monthlyRate = useMemo(() => {
    if (!selectedPlan || !totalAmount) return 0;
    const months = selectedPlan.months || 1;
    return totalAmount / months;
  }, [selectedPlan, totalAmount]);

  async function handleContinue() {
    if (!selectedPlan) return;

    setErr("");
    setBusy(true);

    try {
      const { data } = await api.post("/dues/create-checkout-session", {
        plan_code: selectedPlan.code,
      });

      if (!data?.url) {
        throw new Error("No Stripe checkout URL returned.");
      }

      // 👉 Redirect to Stripe-hosted checkout
      window.location.href = data.url;
    } catch (e) {
      console.error("Error creating checkout session:", e);
      setErr(
        e.response?.data?.error ||
          e.message ||
          "We could not start the secure Stripe checkout. Please try again."
      );
      setBusy(false);
    }
  }

  return (
    <div className="ck-page">
      <div className="ck-shell">
        {/* Header */}
        <header className="ck-header">
          <button
            type="button"
            className="ck-back"
            onClick={() => nav(-1)}
            aria-label="Back"
          >
            ←
          </button>
          <div>
            <p className="ck-eyebrow">Membership Dues</p>
            <h1 className="ck-title">Membership Plan Checkout</h1>
            <p className="ck-subtitle">
              Choose the contribution schedule that works best for you. The next
              step will take you to a secure Stripe checkout page.
            </p>
          </div>
        </header>

        <section className="ck-main">
          {loadingPlans && (
            <div className="ck-loading">Loading membership plans…</div>
          )}

          {err && (
            <div className="ck-banner" role="alert">
              {err}
            </div>
          )}

          {!loadingPlans && !err && (
            <>
              {/* Plan selector */}
              <h2 className="ck-section-title">Select a Membership Plan</h2>

              <div className="ck-plan-grid">
                {plans.map((p) => {
                  const cents =
                    Number(p.default_amount_cents) ||
                    Number(p.min_amount_cents) ||
                    0;
                  const total = cents / 100;
                  const months = p.months || 1;
                  const perMonth = total / months;

                  const active = selectedCode === p.code;

                  return (
                    <button
                      key={p.code}
                      type="button"
                      className={`ck-plan-card ${
                        active ? "ck-plan-card--active" : ""
                      }`}
                      onClick={() => setSelectedCode(p.code)}
                    >
                      <div className="ck-plan-head">
                        <h3 className="ck-plan-title">{p.label}</h3>
                        <span className="ck-pill">
                          {months} {months > 1 ? "months" : "month"}
                        </span>
                      </div>

                      <div className="ck-plan-body">
                        <div className="ck-plan-amount">
                          ${total.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </div>
                        {months > 1 && (
                          <div className="ck-plan-sub">
                            ≈ $
                            {perMonth.toFixed(2)}
                            /month
                          </div>
                        )}
                        <p className="ck-plan-note">
                          Recommended by the Finance team. Exact amount is
                          calculated on the secure Stripe server.
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* CTA row */}
              <div className="ck-footer-row">
                <div className="ck-total-chip">
                  {selectedPlan && totalAmount > 0 ? (
                    <>
                      Total due today:{" "}
                      <strong>
                        $
                        {totalAmount.toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}
                      </strong>
                    </>
                  ) : (
                    "Select a plan to continue"
                  )}
                </div>

                <button
                  type="button"
                  className="ck-cta"
                  disabled={!selectedPlan || busy}
                  onClick={handleContinue}
                >
                  {busy
                    ? "Redirecting to Stripe…"
                    : selectedPlan && totalAmount
                    ? `Continue to Stripe — $${totalAmount.toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        }
                      )}`
                    : "Continue to Stripe"}
                </button>
              </div>

              <p className="ck-footnote">
                🔒 You’ll complete your payment on Stripe&apos;s secure portal.
                Holy Trinity does <strong>not</strong> store your card details.
              </p>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
