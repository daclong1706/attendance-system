import { AttendanceHistory, AttendanceStatus } from "../types/attendanceTypes";
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

  async getAttendanceStatus(
    student_id: number,
    class_section_id: number,
  ): Promise<AttendanceStatus> {
    try {
      const response = await axiosClient.post<AttendanceStatus>(
        "student/attendance",
        {
          student_id: student_id,
          class_section_id: class_section_id,
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllAttendanceStatus(student_id: number): Promise<AttendanceHistory> {
    try {
      const response = await axiosClient.post<AttendanceHistory>(
        "student/attendance/all",
        {
          student_id: student_id,
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const studentAPI = new StudentAPI();
export default studentAPI;
