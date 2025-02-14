import axios from "axios";
import { ProfileFormData, UserData } from "../types/types";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

export const register = async (userData: UserData) => {
  try {
    const response = await authApi.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error("error =>", error);
    throw error;
  }
};

export const login = async (userData: UserData) => {
  try {
    const response = await authApi.post("/login", userData);
    return response.data;
  } catch (error) {
    console.error("error =>", error);
    throw error;
  }
};

export const getUserProfile = async (token: string) => {
  try {
    const response = await authApi.get("/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("error =>", error);
    throw error;
  }
};

export const updateProfile = async (formData: ProfileFormData) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await authApi.patch("/profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("error =>", error);
    throw error;
  }
};
