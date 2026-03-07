import React from "react";
import DashboardLayout from "../../../Shared/DashboardLayout";

export default function PaymentGateways() {
  return (
    <DashboardLayout title="Payment Gateways" nav={[{ to: "/dash/finance/settings", label: "Settings" }]}>
      <div className="panel">
        <p>
          Stripe & PayPal are configured server-side.
          <br />
          Card details never touch our servers.
        </p>
      </div>
    </DashboardLayout>
  );
}