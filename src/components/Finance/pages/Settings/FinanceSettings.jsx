import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Shared/DashboardLayout";

export default function FinanceSettings() {
  return (
    <DashboardLayout title="Finance Settings" nav={[{ to: "/dash/finance", label: "Dashboard" }]}>
      <div className="panel">
        <p>
          ✅ We do <strong>not</strong> store card information. Stripe/PayPal handle payment details.
          <br />
          We store only transaction records (amount, status, provider IDs).
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
          <Link className="btn btn-small" to="/dash/finance/settings/gateways">Payment Gateways</Link>
          <Link className="btn btn-small" to="/dash/finance/settings/receipts">Receipt Templates</Link>
        </div>
      </div>
    </DashboardLayout>
  );
}