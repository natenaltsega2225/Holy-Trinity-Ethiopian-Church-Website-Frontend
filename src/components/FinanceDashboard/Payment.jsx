//src/components/FinanceDashboard/Payment.jsx
import React from "react";
import DashboardLayout from "../Shared/DashboardLayout";
export default function Payment(){
  return(
    <DashboardLayout title="Payments" nav={[{to:"/dash/finance",label:"Overview"}]}>
      <p>Stripe/ACH payments table, filters, refunds, manual records.</p>
    </DashboardLayout>
  );
}
