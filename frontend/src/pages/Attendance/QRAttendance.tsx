import { MdClose } from "react-icons/md";

interface Props {
  onClose: () => void;
}

const QRAttendance = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:text-black">
      <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-lg md:max-w-md">
        <button
          className="hover:text-primary-700 absolute top-2 right-2 cursor-pointer rounded-md p-1 hover:bg-gray-200"
          onClick={onClose}
        >
          <MdClose className="h-6 w-6" />
        </button>
        <div className="flex items-center justify-center">
          <h2 className="text-lg font-bold">Mã điểm danh</h2>
        </div>

        {/* Nội dung chính */}
        <div className="mt-4">
          <div className="flex items-center justify-center overflow-y-auto rounded border-2 border-gray-500 p-4 md:h-[400px] md:w-[400px]">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" // Thay bằng
              alt="QR Code"
              className="h-full w-full"
            />
          </div>
        </div>

        {/* Footer */}
        {/* <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Đóng
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default QRAttendance;
