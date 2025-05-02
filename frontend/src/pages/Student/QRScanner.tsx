import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

interface QRScannerProps {
  onScanSuccess: (qrCode: string) => void;
}

const QRScanner = ({ onScanSuccess }: QRScannerProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false,
    );

    scanner.render(
      (result) => {
        if (result) {
          onScanSuccess(result);
          scanner.clear();
          navigate(-1);
        }
      },
      (error) => {
        console.error("QR Code scan error:", error);
      },
    );

    return () => {
      scanner.clear();
    };
  }, []);

  return <div id="qr-reader" className="w-full rounded-2xl" />;
};

export default QRScanner;
