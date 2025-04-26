import { Class } from "../types/classType";
import axiosClient from "./axiosClient";

class TeacherAPI {
  async getAllClass(): Promise<Class[]> {
    try {
      const response = await axiosClient.get<Class[]>("/teacher/classes");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const teacherAPI = new TeacherAPI();
export default teacherAPI;
