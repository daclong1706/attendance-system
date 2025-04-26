import { List, ListItem, Modal, ModalBody, ModalHeader } from "flowbite-react";
import LoadingModal from "../../components/modal/LoadingModal";
import { useAppSelector } from "../../store/hook";
import { User } from "../../types/userTypes";

interface ViewUserFormProps {
  user: User;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

const ViewUserForm: React.FC<ViewUserFormProps> = ({
  user,
  openModal,
  setOpenModal,
}) => {
  const { loading } = useAppSelector((state) => state.user);

  return (
    <div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="border-none"></ModalHeader>
        <ModalBody>
          <div className="grid grid-flow-col grid-rows-3 gap-4">
            <div className="row-span-3">
              {user?.avatar ? (
                <img
                  className="h-full w-full rounded-xl"
                  src={user.avatar}
                  alt={user.name}
                />
              ) : (
                <div className="flex h-64 w-42 items-center justify-center rounded-xl bg-indigo-200">
                  {user?.name
                    ? user.name.trim().split(" ").slice(-1)[0][0].toUpperCase()
                    : ""}
                </div>
              )}
            </div>
            <div className="col-span-2 text-xl font-bold">{user.name}</div>
            <div className="col-span-2 row-span-2">
              <List>
                <ListItem>Email: {user.email}</ListItem>
                <ListItem>Mã số: {user.mssv}</ListItem>
                <ListItem>Quyền: {user.role}</ListItem>
                <ListItem>
                  Thời gian tạo tài khoản: {user.created_at.toString()}
                </ListItem>
              </List>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <LoadingModal isOpen={loading} />
    </div>
  );
};

export default ViewUserForm;
