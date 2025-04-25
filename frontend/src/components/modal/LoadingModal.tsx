import { Spinner } from "flowbite-react";

interface LoadingModalProps {
  isOpen: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:text-black">
      <Spinner aria-label="Default status example" />
    </div>
  );
};

export default LoadingModal;
