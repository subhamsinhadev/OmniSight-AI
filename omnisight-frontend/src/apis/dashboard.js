import API from "./api";

export const getClientData = () => API.get("/client/dashboard");
export const getAdminData = () => API.get("/admin/dashboard");

export const getPayoutHistory = () => API.get("/client/payouts");