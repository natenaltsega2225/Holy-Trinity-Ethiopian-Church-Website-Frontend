// // src/features/member/routes/MemberRoutes.jsx
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import ProtectedRoute from "../../../components/ProtectedRoute";
// import MemberLayout from "../layout/MemberLayout";

// // pages
// import MemberDashboard from "../pages/Dashboard/MemberDashboard";
// import MyProfile from "../pages/Account/MyProfile";
// import Family from "../pages/Account/Family";
// import Directory from "../pages/Account/Directory";

// import MyPayments from "../pages/Payments/MyPayments";
// import InvoicesReceipts from "../pages/Payments/InvoicesReceipts";

// import Announcements from "../pages/Support/Announcements";

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
//         <Route index element={<MemberDashboard />} />

//         <Route path="account/my-profile" element={<MyProfile />} />
//         <Route path="account/family" element={<Family />} />
//         <Route path="account/directory" element={<Directory />} />

//         <Route path="payments/my-payments" element={<MyPayments />} />
//         <Route path="payments/invoices" element={<InvoicesReceipts />} />

//         <Route path="support/announcements" element={<Announcements />} />

//         <Route path="*" element={<Navigate to="." replace />} />
//       </Route>
//     </Routes>
//   );
// }

// src/components/member/routes/MemberRoutes.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../../ProtectedRoute";
import MemberLayout from "../layout/MemberLayout";

const MemberDashboard = lazy(() => import("../pages/Dashboard/MemberDashboard"));
const MyProfile = lazy(() => import("../pages/Account/MyProfile"));
const Family = lazy(() => import("../pages/Account/Family"));
const Directory = lazy(() => import("../pages/Account/Directory"));
const MyPayments = lazy(() => import("../pages/Payments/MyPayments"));
const InvoicesReceipts = lazy(() => import("../pages/Payments/InvoicesReceipts"));
const Announcements = lazy(() => import("../pages/Support/Announcements"));

const Fallback = <div className="dash-loading">Loading…</div>;

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
        <Route index element={<Suspense fallback={Fallback}><MemberDashboard /></Suspense>} />
        <Route path="my-profile" element={<Suspense fallback={Fallback}><MyProfile /></Suspense>} />
        <Route path="family" element={<Suspense fallback={Fallback}><Family /></Suspense>} />
        <Route path="directory" element={<Suspense fallback={Fallback}><Directory /></Suspense>} />
        <Route path="my-payments" element={<Suspense fallback={Fallback}><MyPayments /></Suspense>} />
        <Route path="invoices" element={<Suspense fallback={Fallback}><InvoicesReceipts /></Suspense>} />
        <Route path="announcements" element={<Suspense fallback={Fallback}><Announcements /></Suspense>} />

        <Route path="*" element={<Navigate to="." replace />} />
      </Route>
    </Routes>
  );
}