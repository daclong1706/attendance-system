import { useState } from "react";
import { updateUser } from "../../store/slices/userReducer";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import LoadingModal from "../../components/modal/LoadingModal";
import { showErrorMessage, showSuccessMessage } from "../../helper/toastHelper";
import { Button, FloatingLabel, Select } from "flowbite-react";
import { User } from "../../types/userTypes";

interface EditUserFormProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const [updatedData, setUpdatedData] = useState<Partial<User>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(updatedData).length === 0) {
      showErrorMessage("Vui lòng nhập thông tin cần cập nhật!");
      return;
    }
    try {
      dispatch(updateUser({ userId: user.id, updatedData }));
      showSuccessMessage("Cập nhật thành công");
    } catch {
      showErrorMessage("Lỗi khi cập nhật");
    }

    onClose();
  };

  if (!isOpen) return false;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50`}
    >
      <div className="w-1/2 rounded-lg bg-white p-6 py-12 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Tạo tài khoản</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FloatingLabel
            variant="outlined"
            label="Họ và tên"
            type="text"
            value={updatedData.name ?? user.name}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, name: e.target.value })
            }
          />
          <FloatingLabel
            variant="outlined"
            label="Email"
            type="email"
            value={updatedData.email ?? user.email}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, email: e.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-2">
            <FloatingLabel
              variant="outlined"
              label="Mã số"
              type="text"
              value={updatedData.mssv ?? user.mssv}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, mssv: e.target.value })
              }
            />
            <Select
              id="role"
              required
              value={updatedData.role ?? user.role}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, role: e.target.value })
              }
            >
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </Select>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button type="button" onClick={onClose} color="gray">
              Hủy
            </Button>
            <Button type="submit" color="blue">
              Sửa
            </Button>
          </div>
        </form>
      </div>
      <LoadingModal isOpen={loading} />
    </div>
  );
};

export default EditUserForm;
