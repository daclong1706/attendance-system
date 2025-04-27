import { Class } from "../types/classType";
import axiosClient from "./axiosClient";

class ClassAPI {
  async getClass(): Promise<Class[]> {
    try {
      const response = await axiosClient.get<Class[]>("/class");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const classAPI = new ClassAPI();
export default classAPI;
