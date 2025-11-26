//src/components/MembershipDashoard/Announcements.jsx
import React from "react";
import DashboardLayout from "../Shared/DashboardLayout";
export default function Announcements(){
  return(
    <DashboardLayout title="Announcements" nav={[{to:"/dash/membership",label:"Overview"}]}>
      <p>News and updates for members.</p>
    </DashboardLayout>
  );
}
