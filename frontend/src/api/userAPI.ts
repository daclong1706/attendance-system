import { User } from "../types/userTypes";
import axiosClient from "./axiosClient";

class UserAPI {
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

  async createUser(userData: Partial<User>): Promise<User> {
    try {
      const response = await axiosClient.post<{ data: User }>(
        "/user/create",
        userData,
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteUser(userId: number): Promise<{ message: string }> {
    try {
      const response = await axiosClient.delete<{ message: string }>(
        `/user/${userId}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateUser(userId: number, updatedData: Partial<User>): Promise<User> {
    try {
      const response = await axiosClient.put<User>(
        `/user/${userId}`,
        updatedData,
      );
      return response.data;
    } catch (error) {
      console.error(error);
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
