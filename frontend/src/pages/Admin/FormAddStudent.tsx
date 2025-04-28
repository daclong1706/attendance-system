import { Button, FloatingLabel } from "flowbite-react";
import { useEffect, useState } from "react";
import LoadingModal from "../../components/modal/LoadingModal";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { fetchAllStudent } from "../../store/slices/studentReducer";

interface FromAddStudentProps {
  isOpen: boolean;
  onClose: () => void;
  addStudentToClass: (studentId: number[]) => void;
}

const FromAddStudent: React.FC<FromAddStudentProps> = ({
  isOpen,
  onClose,
  addStudentToClass,
}) => {
  const dispatch = useAppDispatch();
  const { students, loading } = useAppSelector((state) => state.student);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchAllStudent());
    }
  }, [dispatch, isOpen]);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.mssv.includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectStudent = (studentId: number) => {
    setSelectedStudents([...selectedStudents, studentId]);
    setSearchTerm("");
  };

  const handleRemoveStudent = (studentId: number) => {
    setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black/50">
      <div className="mt-20 w-1/2 rounded-lg bg-white p-6 py-12 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Thêm sinh viên vào lớp</h2>
        <FloatingLabel
          variant="outlined"
          label="Nhập MSSV, tên hoặc email sinh viên"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
          autoComplete="off"
        />

        {/* Hiển thị danh sách sinh viên có liên quan */}
        <div className="relative">
          {searchTerm && (
            <ul className="absolute z-50 mt-2 max-h-96 w-full overflow-y-auto rounded-xl border border-indigo-500 bg-gray-100">
              {filteredStudents.map((student) => (
                <li
                  key={student.id}
                  className="cursor-pointer rounded-xl px-4 py-2 hover:bg-indigo-300"
                  onClick={() => handleSelectStudent(student.id)}
                >
                  {student.name} ({student.mssv}) - {student.email}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Hiển thị danh sách sinh viên đã chọn */}
        <div className="relative mt-4">
          <h3 className="font-semibold">Sinh viên đã chọn:</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedStudents.map((mssv) => (
              <div
                key={mssv}
                className="flex items-center gap-2 rounded-xl bg-indigo-500 px-3 py-1 text-sm text-white"
              >
                {mssv}
                <button
                  className="ml-2 text-red-300 transition-all hover:text-red-500"
                  onClick={() => handleRemoveStudent(mssv)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" color="red" onClick={onClose}>
            Hủy
          </Button>
          <Button
            type="button"
            color="green"
            onClick={() => {
              addStudentToClass(selectedStudents);
              setSelectedStudents([]);
            }}
          >
            Thêm vào lớp
          </Button>
        </div>
      </div>
      <LoadingModal isOpen={loading} />
    </div>
  );
};

export default FromAddStudent;
