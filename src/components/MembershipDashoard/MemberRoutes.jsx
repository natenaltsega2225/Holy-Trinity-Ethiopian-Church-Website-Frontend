// // //src/components/MembershipDashoard/MemberRoutes.jsx
// // import React from "react";
// // import { Routes, Route, Navigate } from "react-router-dom";
// // import ProtectedRoute from "../ProtectedRoute";
// // import MemberLayout from "./MemberLayout";   // ✅ correct case & folder

// // // page components (place these files in MembershipDashboard/)
// // import Overview from "./Overview";
// // import Myprofile from "./Myprofile";
// // import MyPayments from "./MyPayments";
// // import MembershipRenewal from "./MembershipRenewal";
// // import InvoicesReceipts from "./InvoicesReceipts";
// // import Announcements from "./Announcements";

// // export default function MemberRoutes() {
// //   return (
// //     <Routes>
// //       <Route
// //         element={
// //           <ProtectedRoute roles={["member", "member_mgr", "finance", "admin"]}>
// //             <MemberLayout />
// //           </ProtectedRoute>
// //         }
// //       >
// //         <Route index element={<Overview />} />
        
// //         <Route path="my-payments" element={<MyPayments />} />
// //         <Route path="renewal" element={<MembershipRenewal />} />
// //         <Route path="invoices" element={<InvoicesReceipts />} />
// //         <Route path="announcements" element={<Announcements />} />
// //        <Route path="my-profile" element={<Myprofile />} />
// //         <Route path="*" element={<Navigate to="." replace />} />
// //       </Route>
// //     </Routes>
// //   );
// // }

// // //src/components/MembershipDashoard/MemberRoutes.jsx  (your membership router file)
// // src/components/MembershipDashboard/MemberRoutes.jsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "../ProtectedRoute";
// import MemberLayout from "./MemberLayout";

// import Overview from "./Overview";
// import Myprofile from "./Myprofile";
// import MyPayments from "./MyPayments";
// import MembershipRenewal from "./MembershipRenewal";
// import InvoicesReceipts from "./InvoicesReceipts";
// import Announcements from "./Announcements";

// export default function MemberRoutes() {
//   return (
//     <Routes>
//       <Route
//         element={
//           <ProtectedRoute roles={["member", "member_mgr", "finance", "admin"]}>
//             <MemberLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Overview />} />
//         <Route path="my-profile" element={<Myprofile />} />
//         <Route path="my-payments" element={<MyPayments />} />
//         <Route path="renewal" element={<MembershipRenewal />} />
//         <Route path="invoices" element={<InvoicesReceipts />} />
//         <Route path="announcements" element={<Announcements />} />
        
//         {/* ⛔ no /directory route */}
//       </Route>
//     </Routes>
//   );
// }


// src/components/MembershipDashoard/MemberRoutes.jsx
// src/components/MembershipDashoard/MemberRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import MemberLayout from "./MemberLayout";

import Overview from "./Overview";
import Myprofile from "./Myprofile";
import MyPayments from "./MyPayments";
import MembershipRenewal from "./MembershipRenewal";
import InvoicesReceipts from "./InvoicesReceipts";
import Announcements from "./Announcements";

export default function MemberRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute roles={["member", "member_mgr", "finance", "admin"]}>
            <MemberLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="my-profile" element={<Myprofile />} />
        <Route path="my-payments" element={<MyPayments />} />
        <Route path="renewal" element={<MembershipRenewal />} />
        <Route path="invoices" element={<InvoicesReceipts />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Route>
    </Routes>
  );
}
