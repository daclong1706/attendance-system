import { useState } from "react";
import QRScanner from "./QRScanner";
import axiosClient from "../../api/axiosClient";
import { showErrorMessage, showSuccessMessage } from "../../helper/toastHelper";

const Attendance = () => {
  const handleScanSuccess = async (qrCode: string) => {
    try {
      await axiosClient.put("student/attendance/mark-present", {
        qr_code: qrCode,
      });
      showSuccessMessage("Điểm danh thành công");
    } catch {
      showErrorMessage("Điểm danh thất bại");
    }
  };

  return (
    <div className="mt-6 flex items-center justify-center">
      <QRScanner onScanSuccess={handleScanSuccess} />
    </div>
  );
};

export default Attendance;
