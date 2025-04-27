import { Schedule } from "../types/scheduleTypes";
import axiosClient from "./axiosClient";

class StudentAPI {
  async getSchedule(): Promise<Schedule[]> {
    try {
      const response = await axiosClient.get<Schedule[]>("student/schedule");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const studentAPI = new StudentAPI();
export default studentAPI;
