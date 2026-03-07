import React from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../../Shared/DashboardLayout";

export default function TransactionDetails() {
  const { id } = useParams();
  return (
    <DashboardLayout title={`Transaction #${id}`} nav={[{ to: "/dash/finance/transactions", label: "Transactions" }]}>
      <div className="panel">
        <p>Transaction details and receipt – coming next.</p>
      </div>
    </DashboardLayout>
  );
}