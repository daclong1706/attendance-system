import { MdClose } from "react-icons/md";
import CameraFeed from "../../components/CameraFeed";
import { useState } from "react";
import recognitionAPI from "../../api/recognitionAPI";
import { FaceResponse } from "../../types/responseTypes";
import { showErrorMessage, showSuccessMessage } from "../../helper/toastHelper";
import LoadingModal from "../../components/modal/LoadingModal";

interface Props {
  onClose: () => void;
  classSectionId: number;
  selectedDate: string;
}

const FaceAttendance = ({ onClose, classSectionId, selectedDate }: Props) => {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [student, setStudent] = useState<FaceResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCapture = (blob: Blob) => {
    setImageBlob(blob);
    setStudent(null);

    const imageUrl = URL.createObjectURL(blob);
    setImagePreview(imageUrl);
  };

  const handleSubmit = async (imageBlob: Blob) => {
    if (!imageBlob) {
      showErrorMessage("Hãy chụp ảnh trước");
      return;
    }

    const requestData = {
      class_section_id: classSectionId,
      selected_date: selectedDate,
    };
    setLoading(true);
    try {
      const response = await recognitionAPI.sendFaceRecognitionData(
        imageBlob,
        requestData,
      );
      setStudent(response);
      console.log(response);
      if (response == null) {
        showErrorMessage("Nhận diện không thành công");
      } else {
        showSuccessMessage(`Nhận diện thành công sinh viên ${response?.name}`);
      }
      setLoading(false);
    } catch {
      showErrorMessage("Nhận diện không thành công");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:text-black">
      <div className="relative m-4 h-fit rounded-lg bg-white p-6 shadow-lg md:m-12 dark:bg-gray-800 dark:text-white">
        <button
          className="hover:text-primary-700 absolute top-2 right-2 cursor-pointer rounded-md p-1 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          onClick={onClose}
        >
          <MdClose className="h-6 w-6" />
        </button>

        <div className="flex items-center justify-center">
          <h2 className="text-lg font-bold">Điểm danh khuôn mặt</h2>
        </div>

        <div className="mt-4">
          <div className="flex space-x-2 md:p-4">
            <CameraFeed onCapture={handleCapture} onSubmit={handleSubmit} />
            <div className="hidden flex-col items-center space-y-2 rounded-md border-2 border-gray-400 px-4 py-2 md:flex">
              <div className="mx-6 font-medium">Thông tin điểm danh</div>
              <div className="flex flex-col items-center">
                <img
                  src={
                    imagePreview ||
                    "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  }
                  alt="Ảnh chụp"
                  className="h-[200px] w-[150px] rounded-md"
                />
              </div>
              <div className="mt-6 flex flex-col space-y-2">
                <span>Mã số sinh viên: {student?.mssv}</span>
                <span>Họ tên: {student?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoadingModal isOpen={loading} />
    </div>
  );
};

export default FaceAttendance;
