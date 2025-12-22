// src/pages/Donate.jsx
// src/pages/Donate.jsx
import React, { useState } from "react";
import api from "../components/api";
import "../styles/donation.css";

const QUICK_AMOUNTS = [25, 50, 100, 250];

export default function Donate() {
  const [amount, setAmount] = useState(50);
  const [purpose, setPurpose] = useState("donation"); // donation | membership | other
  const [frequency, setFrequency] = useState("one_time");
  const [method, setMethod] = useState("card"); // card | paypal | other
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const handleQuickAmount = (val) => {
    setAmount(val);
  };

  async function donateWithStripe() {
    setErr("");
    setBusy(true);
    try {
      const { data } = await api.post("/donations/create-checkout-session", {
        amount,
        purpose,
        frequency,
        success_url: window.location.origin + "/donate?status=success",
        cancel_url: window.location.href,
      });
      window.location.href = data.url;
    } catch (e) {
      setErr(e.response?.data?.error || "Could not start checkout.");
      setBusy(false);
    }
  }

  const paypalUrl = (() => {
    // Replace with your PayPal hosted button ID
    const hostedId = "YOUR_PAYPAL_BUTTON_ID";
    return `https://www.paypal.com/donate?hosted_button_id=${hostedId}&amount=${encodeURIComponent(
      amount
    )}`;
  })();

  return (
    <main className="donate-page">
      <section className="donate-card">
        <header className="donate-header">
          <h1>Support Our Church</h1>
          <p>
            Your generosity supports worship, outreach, and ministries.
            Thank you for your gift!
          </p>
        </header>

        {err && (
          <div className="donate-error" role="alert">
            {err}
          </div>
        )}

        {/* Amount + purpose */}
        <div className="donate-grid">
          <div className="donate-left">
            <h2 className="donate-section-title">Choose an amount</h2>

            <div className="donate-quick-row">
              {QUICK_AMOUNTS.map((val) => (
                <button
                  key={val}
                  type="button"
                  className={
                    "donate-quick-btn" +
                    (Number(amount) === val ? " is-active" : "")
                  }
                  onClick={() => handleQuickAmount(val)}
                >
                  ${val}
                </button>
              ))}
            </div>

            <div className="donate-amount-input">
              <span>$</span>
              <input
                type="number"
                min={1}
                step={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="donate-purpose">
              <label>Gift purpose</label>
              <div className="donate-chip-row">
                <button
                  type="button"
                  onClick={() => setPurpose("donation")}
                  className={
                    "donate-chip" +
                    (purpose === "donation" ? " donate-chip-active" : "")
                  }
                >
                  General Donation
                </button>
                <button
                  type="button"
                  onClick={() => setPurpose("membership")}
                  className={
                    "donate-chip" +
                    (purpose === "membership" ? " donate-chip-active" : "")
                  }
                >
                  Membership Dues
                </button>
                <button
                  type="button"
                  onClick={() => setPurpose("other")}
                  className={
                    "donate-chip" +
                    (purpose === "other" ? " donate-chip-active" : "")
                  }
                >
                  Other
                </button>
              </div>
            </div>

            <div className="donate-frequency">
              <label>Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="one_time">One-time gift</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="semiannual">Every 6 months</option>
                <option value="annual">Yearly</option>
              </select>
              <p className="donate-note">
                Recurring schedules are tracked in reports; the online payment
                itself is processed as a single secure payment through
                Stripe/PayPal.
              </p>
            </div>
          </div>

          {/* Payment methods */}
          <div className="donate-right">
            <h2 className="donate-section-title">Payment method</h2>

            <div className="donate-tabs">
              <button
                type="button"
                className={
                  "donate-tab" + (method === "card" ? " donate-tab-active" : "")
                }
                onClick={() => setMethod("card")}
              >
                Card / Apple Pay / Visa
              </button>
              <button
                type="button"
                className={
                  "donate-tab" +
                  (method === "paypal" ? " donate-tab-active" : "")
                }
                onClick={() => setMethod("paypal")}
              >
                PayPal
              </button>
              <button
                type="button"
                className={
                  "donate-tab" +
                  (method === "other" ? " donate-tab-active" : "")
                }
                onClick={() => setMethod("other")}
              >
                Venmo / Cash App / Zelle
              </button>
            </div>

            {method === "card" && (
              <div className="donate-panel">
                <p>
                  You’ll be redirected to a secure Stripe checkout page where
                  you can pay with credit/debit card, Apple Pay, or other
                  wallet methods enabled on your device. Card details never
                  touch our servers.
                </p>
                <button
                  type="button"
                  className="donate-main-btn"
                  onClick={donateWithStripe}
                  disabled={busy}
                >
                  {busy ? "Redirecting…" : "Give securely with card"}
                </button>
              </div>
            )}

            {method === "paypal" && (
              <div className="donate-panel">
                <p>
                  Use PayPal to donate from your PayPal balance or linked
                  account.
                </p>
                <a
                  href={paypalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="donate-main-btn donate-paypal-btn"
                >
                  Continue with PayPal
                </a>
                <p className="donate-note">
                  You can configure the PayPal “hosted button” ID in the code
                  once it’s created in your PayPal dashboard.
                </p>
              </div>
            )}

            {method === "other" && (
              <div className="donate-panel">
                <p>
                  You can also give using Venmo, Cash App, or Zelle. Please use
                  the details below and note your full name in the memo.
                </p>
                <ul className="donate-other-list">
                  <li>
                    <strong>Venmo:</strong> @YourChurchHandle
                  </li>
                  <li>
                    <strong>Cash App:</strong> $YourCashTag
                  </li>
                  <li>
                    <strong>Zelle:</strong> finance@yourchurch.org
                  </li>
                </ul>
                <p className="donate-note">
                  These methods are peer-to-peer. We don’t see your bank or card
                  details – they’re handled by Venmo, Cash App, and Zelle.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
