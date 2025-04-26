import { AuthResponse } from "../types/authTypes";
import { User } from "../types/userTypes";
import axiosClient from "./axiosClient";

class UserAPI {
  //   async login(email: string, password: string): Promise<AuthResponse> {
  //     try {
  //       const response = await axiosClient.post<AuthResponse>("/auth/login", {
  //         email,
  //         password,
  //       });
  //       localStorage.setItem("auth", JSON.stringify(response.data));
  //       return response.data;
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   }

  async getAllUser(): Promise<User[]> {
    try {
      const response = await axiosClient.get<User[]>("/user/getAllUser");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const response = await axiosClient.get<User>("/user/getUserInformation", {
        params: { id },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //   getUser(): AuthResponse | null {
  //     const auth = localStorage.getItem("auth");
  //     return auth ? JSON.parse(auth) : null;
  //   }
}

const userAPI = new UserAPI();
export default userAPI;
