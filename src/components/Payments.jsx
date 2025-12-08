
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

