import { Subject } from "../types/subjectType";
import axiosClient from "./axiosClient";

class SubjectAPI {
  async getSubject(): Promise<Subject[]> {
    try {
      const response = await axiosClient.get<Subject[]>("/subject");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createSubject(subjectData: Partial<Subject>): Promise<Subject> {
    try {
      const response = await axiosClient.post<Subject>(
        "/subject/create",
        subjectData,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteSubject(subjectId: number): Promise<{ message: string }> {
    try {
      const response = await axiosClient.delete<{ message: string }>(
        `/subject/${subjectId}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateSubject(
    subjectId: number,
    updatedData: Partial<Subject>,
  ): Promise<Subject> {
    try {
      const response = await axiosClient.put<Subject>(
        `/subject/${subjectId}`,
        updatedData,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const subjectAPI = new SubjectAPI();
export default subjectAPI;
