import { useState } from "react";
import { createUser, fetchAllUsers } from "../../store/slices/userReducer";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import LoadingModal from "../../components/modal/LoadingModal";
import { showErrorMessage, showSuccessMessage } from "../../helper/toastHelper";
import { FloatingLabel, Select } from "flowbite-react";

interface CreateUserFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    mssv: "",
    role: "student",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createUser(userData)).unwrap();
      dispatch(fetchAllUsers());
      showSuccessMessage("Tạo tài khoản thành công");
    } catch {
      showErrorMessage("Lỗi khi tạo tài khoản");
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
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          <FloatingLabel
            variant="outlined"
            label="Email"
            type="email"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <FloatingLabel
            variant="outlined"
            label="Mật khẩu"
            type="password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-2">
            <FloatingLabel
              variant="outlined"
              label="Mã số"
              type="text"
              onChange={(e) =>
                setUserData({ ...userData, mssv: e.target.value })
              }
            />
            <Select
              id="role"
              required
              value={userData.role}
              onChange={(e) =>
                setUserData({ ...userData, role: e.target.value })
              }
            >
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </Select>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              className="rounded bg-gray-500 px-4 py-2 text-white"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded bg-indigo-500 px-4 py-2 text-white"
            >
              Tạo tài khoản
            </button>
          </div>
        </form>
      </div>
      <LoadingModal isOpen={loading} />
    </div>
  );
};

export default CreateUserForm;
