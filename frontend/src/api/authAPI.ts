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
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
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
