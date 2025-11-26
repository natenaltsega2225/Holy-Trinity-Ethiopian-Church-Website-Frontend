//src/components/MembershipDashoard/MembershipRenewal.jsx
import React from "react";
import DashboardLayout from "../Shared/DashboardLayout";
export default function MembershipRenewal(){
  return(
    <DashboardLayout title="Renew Membership" nav={[{to:"/dash/membership",label:"Overview"}]}>
      <p>Pick plan (1 / 6 / 12 months) and proceed to /checkout.</p>
    </DashboardLayout>
  );
}
