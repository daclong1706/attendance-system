import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

interface ActionComponentProps<T> {
  data: T;
  setSelectedData: (user: T) => void;
  setIsViewOpen?: (isOpen: boolean) => void;
  setIsEditOpen?: (isOpen: boolean) => void;
  setIsDeleteOpen?: (isOpen: boolean) => void;
}

const ActionComponent = <T extends Record<string, any>>({
  data,
  setSelectedData,
  setIsViewOpen,
  setIsEditOpen,
  setIsDeleteOpen,
}: ActionComponentProps<T>) => {
  return (
    <div className="flex flex-row items-center justify-center gap-3">
      {setIsViewOpen && (
        <button
          className="cursor-pointer text-neutral-400 hover:text-blue-400"
          onClick={() => {
            setSelectedData(data);
            setIsViewOpen(true);
          }}
        >
          <FaEye className="h-5 w-5" />
        </button>
      )}
      {setIsEditOpen && (
        <button
          className="cursor-pointer text-neutral-400 hover:text-green-400"
          onClick={() => {
            setSelectedData(data);
            setIsEditOpen(true);
          }}
        >
          <FaEdit className="h-5 w-5" />
        </button>
      )}
      {setIsDeleteOpen && (
        <button
          className="cursor-pointer text-neutral-400 hover:text-red-400"
          onClick={() => {
            setSelectedData(data);
            setIsDeleteOpen(true);
          }}
        >
          <FaTrashAlt className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default ActionComponent;
