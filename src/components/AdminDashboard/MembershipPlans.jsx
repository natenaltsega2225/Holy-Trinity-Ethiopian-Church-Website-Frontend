//src/components/AdminDashboard/MembershipPlans.jsx
import React from "react";
import DashboardLayout from "../Shared/DashboardLayout";
export default function MembershipPlans(){
  return(
    <DashboardLayout title="Membership Plans" nav={[{to:"/dash/admin",label:"Overview"}]}>
      <p>Create/modify 1, 6, 12-month plans; pricing; discounts.</p>
    </DashboardLayout>
  );
}
