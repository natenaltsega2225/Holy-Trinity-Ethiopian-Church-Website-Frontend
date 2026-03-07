// src/features/member/services/memberApi.js
import api from "../../../components/api";

// Profile
export const getMyMemberProfile = () => api.get("/members/me");
export const updateMyMemberProfile = (payload) => api.put("/members/me", payload);

// Directory
export const getMemberDirectory = (params) => api.get("/members/directory", { params });

// Dues history (your existing endpoint)
export const getMyDuesHistory = () => api.get("/dues/my");

// Family (ONLY if your backend supports /family)
export const getMyFamily = () => api.get("/family");
export const addFamily = (payload) => api.post("/family", payload);
export const deleteFamily = (id) => api.delete(`/family/${id}`);