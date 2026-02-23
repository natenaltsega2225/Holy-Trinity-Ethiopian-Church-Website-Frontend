// //src/components/Shared/MembersList.jsx
// import React, { useEffect, useState } from "react";
// import api from "../api";
// import MemberFilters from "./MemberFilters";

// export default function MembersList({ canEdit=false, canExport=false }) {
//   const [rows, setRows] = useState([]);
//   const [q, setQ] = useState({ text:"", status:"active" });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       setLoading(true);
//       try {
//         const { data } = await api.get("/members", { params:q });
//         setRows(data?.rows || []);
//       } catch (e) {
//         console.error(e);
//         setRows([]);
//       }
//       setLoading(false);
//     })();
//   }, [q]);

//   return (
//     <>
//       <div className="dash-title">Membership</div>
//       <MemberFilters value={q} onChange={setQ} />
//       <div className="table-wrap">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th><th>Email</th><th>Status</th><th>Plan</th><th>Next Due</th><th>Total Paid</th>{(canEdit||canExport)&&<th/>}
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? <tr><td colSpan={7}>Loading…</td></tr> :
//               rows.length ? rows.map(m=>(
//                 <tr key={m.id}>
//                   <td>{m.first_name} {m.last_name}</td>
//                   <td>{m.email}</td>
//                   <td>{m.status}</td>
//                   <td>{m.plan_label}</td>
//                   <td>{m.next_due || "—"}</td>
//                   <td>${(m.total_paid||0).toLocaleString()}</td>
//                   {(canEdit||canExport) && (
//                     <td className="actions">
//                       {canEdit && <button onClick={()=>{/* open edit modal */}}>Edit</button>}
//                       {canExport && <button onClick={()=>{/* export single */}}>Export</button>}
//                     </td>
//                   )}
//                 </tr>
//               )) : <tr><td colSpan={7}>No members found.</td></tr>}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }


// src/components/Shared/MembersList.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import MemberFilters from "./MemberFilters";

export default function MembersList({ canEdit = false, canExport = false }) {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState({ text: "", status: "active", plan: "" });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr("");

      try {
        // Map UI fields -> backend query params
        const params = {
          search: q.text || "",
          page: 1,
          pageSize: 50,
        };

        // OPTIONAL: only include if your backend supports these
        // If your backend doesn't support them, comment them out.
        if (q.plan) params.plan = q.plan;

        // translate status -> active flag if needed
        // backend might use active=1/0 instead of status strings
        if (q.status === "active") params.active = "1";
        if (q.status === "inactive") params.active = "0";
        // delinquent often means "overdue/unpaid", your backend may call it "paid=unpaid"
        if (q.status === "delinquent") params.paid = "unpaid";

        const { data } = await api.get("/members", { params });
        setRows(data?.rows || []);
      } catch (e) {
        console.error(e);
        setRows([]);
        setErr(e?.response?.data?.error || "Failed to load members");
      }

      setLoading(false);
    })();
  }, [q]);

  return (
    <>
      <div className="dash-title">Membership</div>
      <MemberFilters value={q} onChange={setQ} />

      {err ? (
        <div className="auth-banner" style={{ margin: "10px 0" }}>
          {err}
        </div>
      ) : null}

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Plan</th>
              <th>Next Due</th>
              <th>Total Paid</th>
              {(canEdit || canExport) && <th />}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7}>Loading…</td>
              </tr>
            ) : rows.length ? (
              rows.map((m) => (
                <tr key={m.id}>
                  <td>
                    {m.first_name} {m.last_name}
                  </td>
                  <td>{m.email}</td>

                  {/* Your backend might not return m.status/plan_label/next_due/total_paid.
                      So we safely show fallbacks. */}
                  <td>{m.status || m.paid_status || "—"}</td>
                  <td>{m.plan_label || (m.cadence_months ? `${m.cadence_months} months` : "—")}</td>
                  <td>{m.next_due || m.next_due_at || "—"}</td>
                  <td>${Number(m.total_paid || 0).toLocaleString()}</td>

                  {(canEdit || canExport) && (
                    <td className="actions">
                      {canEdit && <button onClick={() => {}}>Edit</button>}
                      {canExport && <button onClick={() => {}}>Export</button>}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No members found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}