import API from "./api";

export const loginUser = (data) => API.post("/login", data);
export const signupUser = (data) => API.post("/signup", data);

