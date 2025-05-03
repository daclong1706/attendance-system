import { useEffect, useRef } from "react";
import { showErrorMessage } from "../helper/toastHelper";
import { Button } from "flowbite-react";

const CameraFeed = ({
  onCapture,
  onSubmit,
}: {
  onCapture: (image: Blob) => void;
  onSubmit: (image: Blob) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        showErrorMessage("Không thể truy cập Camera");
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        window.location.reload();
      }
    };
  }, []);

  const handleCapture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          onCapture(blob);
        }
      }, "image/jpeg");
    }
  };

  const handleSubmit = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          onSubmit(blob);
        }
      }, "image/jpeg");
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-[750px] rounded-xl"
      />
      <div className="mt-2 flex gap-2">
        <Button onClick={handleCapture}>Chụp ảnh</Button>
        <Button onClick={handleSubmit}>Điểm danh</Button>
      </div>
    </div>
  );
};

export default CameraFeed;
