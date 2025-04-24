import { Subject } from "../types/subjectType";
import axiosClient from "./axiosClient";

class SubjectAPI {
  async getAllSubject() {
    try {
      const response = await axiosClient.post<Subject>(
        "/subject/getAllSubject",
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const subjectAPI = new SubjectAPI();
export default subjectAPI;
