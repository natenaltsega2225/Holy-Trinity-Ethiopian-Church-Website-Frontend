//src/components/FinanceDashboard/AuditLogs.jsx
import React from "react";
import DashboardLayout from "../Shared/DashboardLayout";
export default function AuditLogs(){
  return(
    <DashboardLayout title="Audit Logs" nav={[{to:"/dash/admin",label:"Overview"}]}>
      <p>System actions by user/time/IP (exportable).</p>
    </DashboardLayout>
  );
}
