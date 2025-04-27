import { Class } from "../types/classType";
import { Schedule } from "../types/scheduleTypes";
import axiosClient from "./axiosClient";

class TeacherAPI {
  async getAllClass(): Promise<Class[]> {
    try {
      const response = await axiosClient.get<Class[]>("/teacher/classes");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getSchedule(): Promise<Schedule[]> {
    try {
      const response = await axiosClient.get<Schedule[]>("teacher/schedule");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const teacherAPI = new TeacherAPI();
export default teacherAPI;
