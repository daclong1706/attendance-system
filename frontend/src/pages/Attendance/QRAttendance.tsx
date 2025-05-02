import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import teacherAPI from "../../api/teacherAPI";
import { Button, Spinner } from "flowbite-react";

interface Props {
  onClose: () => void;
  classSectionId: number;
  selectedDate: string;
}

const QRAttendance = ({ onClose, classSectionId, selectedDate }: Props) => {
  const [qrSrc, setQrSrc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchQRCode() {
    try {
      setLoading(true);
      setError(null);
      const qrCodeData = await teacherAPI.getOrCreateQRCode(
        classSectionId,
        selectedDate,
      );
      const qrCodeUrl = await teacherAPI.generateQRCode(
        qrCodeData.qr_code_start,
      );
      setQrSrc(qrCodeUrl);
    } catch (error) {
      console.error("Failed to fetch QR code", error);
      setError("Không thể tải mã QR. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  }

  // Gọi API khi component mount
  useEffect(() => {
    fetchQRCode();
  }, [classSectionId, selectedDate]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:text-black">
      <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-lg md:max-w-md">
        {/* Nút đóng */}
        <button
          className="hover:text-primary-700 absolute top-2 right-2 cursor-pointer rounded-md p-1 hover:bg-gray-200"
          onClick={onClose}
        >
          <MdClose className="h-6 w-6" />
        </button>

        <div className="flex items-center justify-center">
          <h2 className="text-lg font-bold">Mã điểm danh</h2>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-center overflow-y-auto rounded border-2 border-gray-500 md:h-[400px] md:w-[400px]">
            {loading ? (
              <Spinner />
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : qrSrc ? (
              <img
                src={qrSrc}
                alt="QR Code"
                className="h-full w-full object-cover"
              />
            ) : (
              <p>Không có mã QR</p>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <Button onClick={fetchQRCode}>Tạo lại mã QR</Button>
        </div>
      </div>
    </div>
  );
};

export default QRAttendance;
