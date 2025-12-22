
// src/pages/DonationPage.jsx
// src/pages/DonationPage.jsx
import React, { useState } from "react";
import api from "../components/api";
import "../styles/donation.css";

const AMOUNT_PRESETS = [25, 50, 100, 250];

const PURPOSE_OPTIONS = [
  "General Church Fund",
  "Children & Youth Ministry",
  "Charity & Outreach",
  "Other (please specify in note)",
];

const METHODS = [
  {
    id: "card",
    label: "Credit / Debit Card & Apple Pay",
    sub: "Visa, Mastercard, American Express, Apple Pay (via Stripe)",
    icon: "💳",
  },
  {
    id: "paypal",
    label: "PayPal",
    sub: "Processed securely through our PayPal account.",
    icon: "🅿️",
  },
  {
    id: "venmo",
    label: "Venmo",
    sub: "Send via Venmo using our church handle.",
    icon: "📱",
  },
  {
    id: "cashapp",
    label: "Cash App",
    sub: "You’ll complete payment through our Cash App link.",
    icon: "💵",
  },
  {
    id: "zelle",
    label: "Zelle",
    sub: "Instructions will be provided after you continue.",
    icon: "🏦",
  },
];

function formatCurrency(n) {
  if (!n || isNaN(n)) return "$0";
  return `$${Number(n).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

function DonationPage() {
  // preset amount
  const [amount, setAmount] = useState(50);
  // custom amount (when user types)
  const [customAmount, setCustomAmount] = useState("");
  const [purpose, setPurpose] = useState(PURPOSE_OPTIONS[0]);
  const [note, setNote] = useState("");
  const [method, setMethod] = useState("card");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  // if custom is filled, use that; otherwise use preset amount
  const displayAmount = customAmount
    ? Number(customAmount || 0)
    : Number(amount || 0);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setInfoMessage("");

    if (!displayAmount || displayAmount <= 0) {
      setErr("Please enter a donation amount greater than $0.");
      return;
    }

    // Right now only card/Apple Pay goes to Stripe.
    if (method !== "card") {
      if (method === "paypal") {
        setInfoMessage(
          "To give via PayPal, please send your gift to our church PayPal account (e.g. paypal.me/YourChurch). Include your purpose in the note."
        );
      } else if (method === "venmo") {
        setInfoMessage(
          "To give via Venmo, please send your gift to our church Venmo handle (e.g. @HolyTrinityChurch) and include your purpose in the note."
        );
      } else if (method === "cashapp") {
        setInfoMessage(
          "To give via Cash App, please send your gift to our Cash App tag (e.g. $HolyTrinityChurch)."
        );
      } else if (method === "zelle") {
        setInfoMessage(
          "To give via Zelle, please send your gift to our church Zelle email/phone. If you need details, please ask a finance committee member."
        );
      }
      return;
    }

    try {
      setBusy(true);

      const { data } = await api.post("/donations/create-checkout-session", {
        amount: displayAmount,
        purpose,
        note,
        success_url: window.location.origin + "/?donation=success",
        cancel_url:
          window.location.origin + "/forms-payments/donation?cancelled=1",
      });

      if (data?.url) {
        window.location.href = data.url;
      } else {
        setErr("Could not start checkout. Please try again.");
      }
    } catch (e) {
      console.error(e);
      setErr(
        e?.response?.data?.error ||
          "A server error occurred while starting the payment."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="donation-page-shell donation-page-wrap">
      <header className="donation-header">
        <h1>Support Holy Trinity Ethiopian Orthodox Tewahedo Church</h1>
        <p>
          "Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver."
— 2 Corinthians 9:7
        </p>
      </header>

      <section className="donation-card">
        <h2>Make a Secure Online Donation</h2>
        <p className="donation-subtext">
          All payments are processed securely by trusted providers. We never
          store your card or bank details.
        </p>

        {err && <div className="donation-alert error">{err}</div>}
        {infoMessage && (
          <div className="donation-alert info">{infoMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="donation-form">
          {/* Amount section */}

         <section className="donation-section">
  <label className="donation-label">Donation amount (USD)</label>

  <div className="donation-amount-row">
    {/* PRESET AMOUNTS */}
    <div className="donation-amount-chips">
      {AMOUNT_PRESETS.map((amt) => (
        <button
          key={amt}
          type="button"
          className={
            "amount-chip" + (Number(amount) === amt ? " active" : "")
          }
          onClick={() => {
            setAmount(amt);
            setCustomAmount("");
          }}
        >
          ${amt}
        </button>
      ))}
    </div>

    {/* CUSTOM AMOUNT FIELD (NOW SAME ROW) */}
    <div className="donation-amount-input custom-inline">
      <span className="prefix">$</span>
      <input
        type="number"
        min="1"
        placeholder="Enter custom amount"
        value={customAmount}
        onChange={(e) => {
          setCustomAmount(e.target.value);
          setAmount(""); // Avoid conflicting with preset display
        }}
      />
    </div>
  </div>
</section>


          {/* Purpose + Note */}
          <div className="donation-section">
            <label className="donation-label" htmlFor="purpose">
              Purpose of your gift
            </label>
            <select
              id="purpose"
              className="donation-select"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            >
              {PURPOSE_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <label className="donation-label" htmlFor="note">
              Optional note or intention
            </label>
            <textarea
              id="note"
              className="donation-textarea"
              rows={3}
              placeholder="Add a note or special intention for this donation (optional)."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* Payment methods – FLEX cards */}
          <div className="donation-section">
            <label className="donation-label">How would you like to pay?</label>

            <div className="donation-methods">
              {METHODS.map((m) => {
                const active = method === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    className={
                      "donation-method-card" + (active ? " active" : "")
                    }
                    onClick={() => setMethod(m.id)}
                  >
                    <div className="donation-method-icon">{m.icon}</div>
                    <div className="donation-method-text">
                      <div className="donation-method-title">{m.label}</div>
                      <div className="donation-method-sub">{m.sub}</div>
                    </div>
                    <div className="donation-method-radio">
                      <span className={active ? "dot active" : "dot"} />
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="donation-fineprint">
              We do <strong>not</strong> store your card or bank information.
              All payments are processed directly by providers such as Stripe
              (for cards &amp; Apple Pay), PayPal, and your bank or wallet.
            </p>
          </div>

          <div className="donation-actions">
            <button
              type="submit"
              className="donation-submit-btn"
              disabled={busy}
            >
              {busy
                ? "Connecting to secure payment…"
                : method === "card"
                ? "Continue to Secure Payment"
                : "See Instructions"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default DonationPage;
