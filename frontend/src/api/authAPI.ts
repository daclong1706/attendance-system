import { AuthResponse } from "../types/authTypes";
import axiosClient from "./axiosClient";

class AuthAPI {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axiosClient.post<AuthResponse>("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("auth", JSON.stringify(response.data));
      console.log("Login successful:", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async fetchRoleCounts(): Promise<{
    admin: number;
    teacher: number;
    student: number;
  } | null> {
    try {
      const response = await axiosClient.get<{
        admin: number;
        teacher: number;
        student: number;
      }>("/auth/role-count");

      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy số lượng role:", error);
      return null;
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem("auth");
  }

  getUser(): AuthResponse | null {
    const auth = localStorage.getItem("auth");
    return auth ? JSON.parse(auth) : null;
  }
}

const authAPI = new AuthAPI();
export default authAPI;
