import { MdClose } from "react-icons/md";
import CameraFeed from "../../components/CameraFeed";

interface Props {
  onClose: () => void; // Hàm xử lý đóng modal
}

const FaceAttendance = ({ onClose }: Props) => {
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
            <CameraFeed />
            <div className="hidden flex-col items-center space-y-2 rounded-md border-2 border-gray-400 px-4 py-2 md:flex">
              <div className="mx-6 font-medium">Thông tin điểm danh</div>
              <div className="flex flex-col items-center">
                <img
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="avatar"
                  className="h-[200px] w-[150px] rounded-md"
                />
              </div>
              <div className="mt-6 flex flex-col space-y-2">
                <span>Mã số sinh viên: 48.01.104.080</span>
                <span>Họ tên: Nguyễn Văn A</span>
                <span>Thời gian: 17:00:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceAttendance;
