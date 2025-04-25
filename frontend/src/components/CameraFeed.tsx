import { useEffect, useRef } from "react";

const CameraFeed = () => {
  // const videoRef = useRef<HTMLVideoElement>(null);
  // const streamRef = useRef<MediaStream | null>(null);

  // useEffect(() => {
  //   const startCamera = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: true,
  //       });
  //       streamRef.current = stream;
  //       if (videoRef.current) {
  //         videoRef.current.srcObject = stream;
  //       }
  //     } catch {
  //       showErrorMessage("Không thể truy cập Camera");
  //     }
  //   };

  //   startCamera();

  //   return () => {
  //     if (streamRef.current) {
  //       streamRef.current.getTracks().forEach((track) => track.stop());
  //       window.location.reload();
  //     }
  //   };
  // }, []);

  return (
    <video
      // ref={videoRef}
      autoPlay
      playsInline
      className="w-[800px] rounded-md md:h-[600px]"
    />
  );
};

export default CameraFeed;
