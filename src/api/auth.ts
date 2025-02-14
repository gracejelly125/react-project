import axios from "axios";

const authApi = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
});

type UserData = {
  id: string;
  password: string;
  nickname?: string;
};

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

type FormData = {
  avatar: null | string;
  nickname: string;
};

export const updateProfile = async (formData: FormData) => {
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
