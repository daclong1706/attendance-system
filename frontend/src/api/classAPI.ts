import { Class } from "../types/classType";
import { Class_session } from "../types/classType";
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
  async getInfoClass(): Promise<Class_session[]> {
    try {
      const response = await axiosClient.get<Class_session[]>("/class");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getClassById(id: number): Promise<Class_session> {
    try {
      const response = await axiosClient.get<Class_session>(
        "/class/infoClassID",
        {
          params: { id },
        },
      );

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
  async deleteClass(class_session_id: number): Promise<{ message: string }> {
    try {
      const response = await axiosClient.delete<{ message: string }>(
        `/admin/class/delete/${class_session_id}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createClass(newClass: Partial<Class_session>): Promise<Class_session> {
    try {
      const response = await axiosClient.post("/admin/class/add", newClass);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async updateClass(
    classID: number,
    updatedData: Class_session,
  ): Promise<Class_session> {
    try {
      const response = await axiosClient.put<Class_session>(
        `/admin/class/update/${classID}`,
        updatedData,
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
