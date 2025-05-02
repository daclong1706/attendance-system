import {
  AttendanceRequest,
  AttendanceResponse,
} from "../types/attendanceTypes";
import { Class, ClassDetail } from "../types/classType";
import { QRCodeResponse } from "../types/responseTypes";
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

  async getClassDetail(classId: number): Promise<ClassDetail> {
    try {
      const response = await axiosClient.get<ClassDetail>(
        `teacher/classes/${classId}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching class details:", error);
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

  async getOrCreateQRCode(
    classSectionId: number,
    selectedDate: string,
  ): Promise<QRCodeResponse> {
    try {
      const response = await axiosClient.post<QRCodeResponse>(
        "/teacher/attendance/qr-code",
        {
          class_section_id: classSectionId,
          date: selectedDate,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching or creating QR code:", error);
      throw error;
    }
  }

  async generateQRCode(data: string): Promise<string> {
    try {
      const response = await axiosClient.get(
        `/qr/generate_qr/${encodeURIComponent(data)}`,
        { responseType: "blob" },
      );

      return URL.createObjectURL(response as unknown as Blob);
    } catch (error) {
      console.error("Error generating QR code:", error);
      throw error;
    }
  }
}

const teacherAPI = new TeacherAPI();
export default teacherAPI;
