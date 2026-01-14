import api from "../api/axios";

// Normal + Social Signup
export const signupService = async (data) => {
  return await api.post("/auth/signup", data);
};

// Normal + Social Login
export const loginService = async (data) => {
  return await api.post("/auth/login", data);
};
