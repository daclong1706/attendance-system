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
}

const subjectAPI = new SubjectAPI();
export default subjectAPI;
