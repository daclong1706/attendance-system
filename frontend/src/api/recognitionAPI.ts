import axiosClient from "./axiosClient";

class RecognitionAPI {
  async sendFaceRecognitionData(imageBlob: Blob, data: object) {
    try {
      if (!imageBlob) throw new Error("Ảnh không được cung cấp!");
      if (!data) throw new Error("Dữ liệu JSON không được cung cấp!");

      // Tạo FormData để gửi file ảnh + dữ liệu JSON
      const formData = new FormData();
      formData.append("image", imageBlob);
      formData.append("data", JSON.stringify(data));

      // Gửi request bằng AxiosClient
      const response = await axiosClient.post(
        "/recognition/attendance/face_recognition",
        formData,
      );

      console.log("Recognition Result:", response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

const recognitionAPI = new RecognitionAPI();
export default recognitionAPI;
