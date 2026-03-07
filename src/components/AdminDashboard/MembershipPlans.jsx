//src/components/AdminDashboard/MembershipPlans.jsx
// import React from "react";
// import DashboardLayout from "../Shared/DashboardLayout";
// export default function MembershipPlans(){
//   return(
//     <DashboardLayout title="Membership Plans" nav={[{to:"/dash/admin",label:"Overview"}]}>
//       <p>Create/modify 1, 6, 12-month plans; pricing; discounts.</p>
//     </DashboardLayout>
//   );
// }

// src/components/AdminDashboard/MembershipPlans.jsx
// src/components/AdminDashboard/MembershipPlans.jsx
import React from "react";

export default function MembershipPlans() {
  return (
    <div>
      <h2 className="dash-title" style={{ marginBottom: 8 }}>
        Membership Plans
      </h2>
      <div style={{ color: "var(--dash-muted)", fontWeight: 850, marginBottom: 12 }}>
        Manage plans, pricing, and billing cadence.
      </div>

      <div className="dash-page">
        <div className="dash-card">
          <div style={{ fontWeight: 950, marginBottom: 6 }}>Plans</div>
          <div style={{ color: "var(--dash-muted)", fontWeight: 850 }}>
            Coming soon… (Connect this to <span className="mono">/api/admin/plans</span> when ready)
          </div>
        </div>
      </div>
    </div>
  );
}