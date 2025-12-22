

// src/components/FinanceDashboard/FinanceRoutes.jsx
// src/components/FinanceDashboard/FinanceRoutes.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import FinanceLayout from "./FinanceLayout";
import DuesPlans from "./DuesPlans";
const Overview         = lazy(() => import("./Overview"));
const Payment          = lazy(() => import("./Payment"));
const Report           = lazy(() => import("./Report"));
const InvoiceGenerator = lazy(() => import("./InvoiceGenerator"));
const Checks           = lazy(() => import("./Checks"));
const CheckManagement  = lazy(() => import("./CheckManagement"));
const ExpenseTracking  = lazy(() => import("./ExpenseTracking"));
const Exports          = lazy(() => import("./Exports"));
const Settings         = lazy(() => import("./Settings"));
const FinanceMemberManagement = lazy(() => import("./MemberManagement"));

const Fallback = <div className="dash-loading">Loading…</div>;

export default function FinanceRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute roles={["finance", "admin"]}>
            <FinanceLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Suspense fallback={Fallback}><Overview/></Suspense>} />
         <Route path="members" element={<Suspense fallback={Fallback}><FinanceMemberManagement/></Suspense>} />
        <Route path="payments" element={<Suspense fallback={Fallback}><Payment/></Suspense>} />
        <Route path="reports" element={<Suspense fallback={Fallback}><Report/></Suspense>} />
        <Route path="invoices" element={<Suspense fallback={Fallback}><InvoiceGenerator/></Suspense>} />
        <Route path="checks" element={<Suspense fallback={Fallback}><Checks/></Suspense>} />
        <Route path="check-management" element={<Suspense fallback={Fallback}><CheckManagement/></Suspense>} />
        <Route path="expenses" element={<Suspense fallback={Fallback}><ExpenseTracking/></Suspense>} />
        <Route path="exports" element={<Suspense fallback={Fallback}><Exports/></Suspense>} />
        <Route path="settings" element={<DuesPlans />} />
        <Route path="settings" element={<Suspense fallback={Fallback}><Settings/></Suspense>} />
       
        {/* wildcard MUST be last */}
        <Route path="*" element={<Navigate to="." replace />} />
        <Route path="members" element={<Suspense fallback={Fallback}><FinanceMemberManagement/></Suspense>} />
<Route path="*" element={<Navigate to="." replace />} />

      </Route>
    </Routes>
  );
}
