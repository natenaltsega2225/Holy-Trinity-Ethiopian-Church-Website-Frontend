// src/components/finance/routes/FinanceRoutes.jsx
// src/components/finance/routes/FinanceRoutes.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute"; // ✅ keep same ProtectedRoute usage
import FinanceLayout from "./layout/FinanceLayout";

const FinanceDashboard = lazy(() => import("./pages/Dashboard/FinanceDashboard"));

const Ledger = lazy(() => import("./pages/Transactions/Ledger"));
const TransactionDetails = lazy(() => import("./pages/Transactions/TransactionDetails"));
const RefundsDisputes = lazy(() => import("./pages/Transactions/RefundsDisputes"));

const DuesPlans = lazy(() => import("./pages/Dues/DuesPlans"));
const MemberDues = lazy(() => import("./pages/Dues/MemberDues"));
const AgingReport = lazy(() => import("./pages/Dues/AgingReport"));

const InvoiceList = lazy(() => import("./pages/Invoices/InvoiceList"));
const InvoiceGenerator = lazy(() => import("./pages/Invoices/InvoiceGenerator"));
const InvoiceDetails = lazy(() => import("./pages/Invoices/InvoiceDetails"));

const Checks = lazy(() => import("./pages/Checks/Checks"));
const CheckManagement = lazy(() => import("./pages/Checks/CheckManagement"));

const Expenses = lazy(() => import("./pages/Expenses/Expenses"));

const ReportsHome = lazy(() => import("./pages/Reports/ReportsHome"));
const Exports = lazy(() => import("./pages/Reports/Exports"));

const FinanceSettings = lazy(() => import("./pages/Settings/FinanceSettings"));
const PaymentGateways = lazy(() => import("./pages/Settings/PaymentGateways"));
const ReceiptTemplates = lazy(() => import("./pages/Settings/ReceiptTemplates"));

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
        <Route index element={<Suspense fallback={Fallback}><FinanceDashboard /></Suspense>} />

        <Route path="transactions" element={<Suspense fallback={Fallback}><Ledger /></Suspense>} />
        <Route path="transactions/:id" element={<Suspense fallback={Fallback}><TransactionDetails /></Suspense>} />
        <Route path="refunds" element={<Suspense fallback={Fallback}><RefundsDisputes /></Suspense>} />

        <Route path="dues/plans" element={<Suspense fallback={Fallback}><DuesPlans /></Suspense>} />
        <Route path="dues/members" element={<Suspense fallback={Fallback}><MemberDues /></Suspense>} />
        <Route path="dues/aging" element={<Suspense fallback={Fallback}><AgingReport /></Suspense>} />

        <Route path="invoices" element={<Suspense fallback={Fallback}><InvoiceList /></Suspense>} />
        <Route path="invoices/new" element={<Suspense fallback={Fallback}><InvoiceGenerator /></Suspense>} />
        <Route path="invoices/:id" element={<Suspense fallback={Fallback}><InvoiceDetails /></Suspense>} />

        <Route path="checks" element={<Suspense fallback={Fallback}><Checks /></Suspense>} />
        <Route path="checks/manage" element={<Suspense fallback={Fallback}><CheckManagement /></Suspense>} />

        <Route path="expenses" element={<Suspense fallback={Fallback}><Expenses /></Suspense>} />

        <Route path="reports" element={<Suspense fallback={Fallback}><ReportsHome /></Suspense>} />
        <Route path="exports" element={<Suspense fallback={Fallback}><Exports /></Suspense>} />

        <Route path="settings" element={<Suspense fallback={Fallback}><FinanceSettings /></Suspense>} />
        <Route path="settings/gateways" element={<Suspense fallback={Fallback}><PaymentGateways /></Suspense>} />
        <Route path="settings/receipts" element={<Suspense fallback={Fallback}><ReceiptTemplates /></Suspense>} />

        <Route path="*" element={<Navigate to="." replace />} />
      </Route>
    </Routes>
  );
}


// // src/components/Finance/routesFinanceRoutes.jsx
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import FinanceLayout from "./layout/FinanceLayout";

// // Dashboard
// import FinanceDashboard from "./pages/Dashboard/FinanceDashboard";

// // Transactions
// import TransactionsOverview from "./pages/Transactions/Overview";
// import Ledger from "./pages/Transactions/Ledger";
// import RefundsDisputes from "./pages/Transactions/RefundsDisputes";
// import TransactionDetails from "./pages/Transactions/TransactionDetails";

// // Dues
// import DuesPlans from "./pages/Dues/DuesPlans";
// import MemberDues from "./pages/Dues/MemberDues";
// import AgingReport from "./pages/Dues/AgingReport";

// // Invoices
// import InvoiceList from "./pages/Invoices/InvoiceList";
// import InvoiceDetails from "./pages/Invoices/InvoiceDetails";
// import InvoiceGenerator from "./pages/Invoices/InvoiceGenerator";

// // Checks
// import Checks from "./pages/Checks/Checks";
// import CheckManagement from "./pages/Checks/CheckManagement";

// // Expenses
// import Expenses from "./pages/Expenses/Expenses";

// // Reports (you have a Reports folder; adjust the import if your main file name differs)
// import Reports from "./pages/Reports/Reports";

// // Settings
// import FinanceSettings from "./pages/Settings/FinanceSettings";
// import PaymentGateways from "./pages/Settings/PaymentGateways";
// import ReceiptTemplates from "./pages/Settings/ReceiptTemplates";

// export default function FinanceRoutes() {
//   return (
//     <Routes>
//       <Route element={<FinanceLayout />}>
//         {/* default */}
//         <Route index element={<FinanceDashboard />} />

//         {/* dashboard explicit */}
//         <Route path="dashboard" element={<FinanceDashboard />} />

//         {/* transactions */}
//         <Route path="transactions" element={<TransactionsOverview />} />
//         <Route path="transactions/ledger" element={<Ledger />} />
//         <Route path="transactions/refunds-disputes" element={<RefundsDisputes />} />
//         <Route path="transactions/:id" element={<TransactionDetails />} />

//         {/* dues */}
//         <Route path="dues-plans" element={<DuesPlans />} />
//         <Route path="dues/member-dues" element={<MemberDues />} />
//         <Route path="dues/aging-report" element={<AgingReport />} />

//         {/* invoices */}
//         <Route path="invoices" element={<InvoiceList />} />
//         <Route path="invoices/new" element={<InvoiceGenerator />} />
//         <Route path="invoices/:id" element={<InvoiceDetails />} />

//         {/* checks */}
//         <Route path="checks" element={<Checks />} />
//         <Route path="checks/manage" element={<CheckManagement />} />

//         {/* expenses */}
//         <Route path="expenses" element={<Expenses />} />

//         {/* reports */}
//         <Route path="reports" element={<Reports />} />

//         {/* settings */}
//         <Route path="settings" element={<FinanceSettings />} />
//         <Route path="settings/payment-gateways" element={<PaymentGateways />} />
//         <Route path="settings/receipt-templates" element={<ReceiptTemplates />} />

//         {/* fallback */}
//         <Route path="*" element={<Navigate to="/dash/finance" replace />} />
//       </Route>
//     </Routes>
//   );
// }