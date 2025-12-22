//src/components/FinanceDashboard/Settings.jsx
import React from "react";
import DashboardLayout from "../Shared/DashboardLayout";
export default function Settings(){
  return(
    <DashboardLayout title="Finance Settings" nav={[{to:"/dash/finance",label:"Overview"}]}>
      <p>Accounting prefs, Stripe keys (server side), tax settings.</p>
    </DashboardLayout>
  );
}
