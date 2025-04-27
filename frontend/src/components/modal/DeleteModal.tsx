"use client";

import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useAppDispatch } from "../../store/hook";
import { deleteUser } from "../../store/slices/userReducer";

interface DeleteModalProps {
  userName: string;
  userID: number;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  userName,
  userID,
  openModal,
  setOpenModal,
}) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (!userID) {
      alert("Vui lòng chọn user để xóa!");
      return;
    }

    dispatch(deleteUser(userID));
    setOpenModal(false);
  };

  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Bạn có chắc chắn muốn xóa {userName} không?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="red" onClick={handleDelete}>
              Xóa
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Hủy
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteModal;
