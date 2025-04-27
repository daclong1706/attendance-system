import {
  AttendanceRequest,
  AttendanceResponse,
} from "../types/attendanceTypes";
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

  async getAttendance(
    classSectionId: number,
    selectedDate: string,
    dayOfWeek: number,
  ): Promise<AttendanceResponse> {
    try {
      const response = await axiosClient.post<AttendanceResponse>(
        `/teacher/attendance`,
        {
          class_section_id: classSectionId,
          selected_date: selectedDate,
          day_of_week: dayOfWeek,
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async saveAttendance(
    classSectionId: number,
    selectedDate: string,
    dayOfWeek: number,
    students: AttendanceRequest[],
  ): Promise<void> {
    try {
      await axiosClient.post("/teacher/attendance/save", {
        class_section_id: classSectionId,
        selected_date: selectedDate,
        day_of_week: dayOfWeek,
        students,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const teacherAPI = new TeacherAPI();
export default teacherAPI;
