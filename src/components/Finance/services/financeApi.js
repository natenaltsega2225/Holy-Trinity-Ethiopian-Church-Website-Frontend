// src/components/finance/services/financeApi.js
// src/components/finance/services/financeApi.js
import api from "../../api"; // ✅ uses your src/components/api.js

export const financeApi = {
  metrics: () => api.get("/finance/metrics"),

  getDuesPlans: () => api.get("/finance/dues-plans"),
  saveDuesPlans: (payload) => api.put("/finance/dues-plans", payload),

  listExpenses: (params) => api.get("/finance/expenses", { params }),
  createExpense: (payload) => api.post("/finance/expenses", payload),
  updateExpense: (id, payload) => api.put(`/finance/expenses/${id}`, payload),

  donationsReport: (params) => api.get("/donations/report", { params }),
};