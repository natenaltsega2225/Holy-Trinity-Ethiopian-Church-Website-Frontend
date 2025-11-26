//src/components/FinanceDashboard/CheckManagement.jsx
import React from "react";
import DashboardLayout from "../Shared/DashboardLayout";
export default function CheckManagement(){
  return(
    <DashboardLayout title="Check Management" nav={[{to:"/dash/finance",label:"Overview"}]}>
      <p>Status, clearing, audit trail.</p>
    </DashboardLayout>
  );
}
