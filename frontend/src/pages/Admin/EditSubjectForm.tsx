import { Button, FloatingLabel } from "flowbite-react";
import { useState } from "react";
import LoadingModal from "../../components/modal/LoadingModal";
import { showErrorMessage, showSuccessMessage } from "../../helper/toastHelper";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { updateSubject } from "../../store/slices/subjectReducer";
import { Subject } from "../../types/subjectType";

interface EditSubjectFormProps {
  subject: Subject;
  isOpen: boolean;
  onClose: () => void;
}

const EditSubjectForm: React.FC<EditSubjectFormProps> = ({
  subject,
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.subject);
  const [updatedData, setUpdatedData] = useState<Partial<Subject>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(updatedData).length === 0) {
      showErrorMessage("Vui lòng nhập thông tin cần cập nhật!");
      return;
    }
    try {
      dispatch(updateSubject({ subjectId: subject.id, updatedData }));
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
            label="Mã học phần"
            type="text"
            value={updatedData.code ?? subject.code}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, code: e.target.value })
            }
          />
          <FloatingLabel
            variant="outlined"
            label="Tên học phàna"
            type="text"
            value={updatedData.name ?? subject.name}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, name: e.target.value })
            }
          />

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

export default EditSubjectForm;
