//src/components/AdminDashboard/SystemSettings.jsx
import React from "react";
import DashboardLayout from "../Shared/DashboardLayout";
export default function SystemSettings(){
  return(
    <DashboardLayout title="System Settings" nav={[{to:"/dash/admin",label:"Overview"}]}>
      <p>Branding, email templates, backup, SSO, environment info.</p>
    </DashboardLayout>
  );
}
