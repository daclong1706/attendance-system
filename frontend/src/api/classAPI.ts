import { Class } from "../types/classType";
import axiosClient from "./axiosClient";

class ClassAPI {
  async getClass(): Promise<Class[]> {
    try {
      const response = await axiosClient.get<Class[]>("/class");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteStudent(
    class_session_id: number,
    student_id: number,
  ): Promise<{ message: string }> {
    try {
      const response = await axiosClient.delete<{ message: string }>(
        `admin/enrollment/${class_session_id}/remove/${student_id}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createClass(newClass: Class): Promise<{ message: string; id: number }> {
    try {
      const response = await axiosClient.post<{ message: string; id: number }>(
        "/class/add",
        newClass,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const classAPI = new ClassAPI();
export default classAPI;
