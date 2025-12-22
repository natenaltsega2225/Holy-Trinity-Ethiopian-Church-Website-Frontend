//src/components/FinanceDashboard/Checks.jsx

import React from "react";
import DashboardLayout from "../Shared/DashboardLayout";
export default function Checks(){
  return(
    <DashboardLayout title="Checks" nav={[{to:"/dash/finance",label:"Overview"}]}>
      <p>Record and reconcile checks; bank deposit batch.</p>
    </DashboardLayout>
  );
}
