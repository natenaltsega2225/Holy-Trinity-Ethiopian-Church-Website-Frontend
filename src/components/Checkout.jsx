
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
