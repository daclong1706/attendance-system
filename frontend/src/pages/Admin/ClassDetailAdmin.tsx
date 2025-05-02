import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  deleteStudent,
  fetchClassById,
} from "../../store/slices/teacherReducer";
import LoadingModal from "../../components/modal/LoadingModal";
import { formatDateDDMMYY, getDayOfWeek } from "../../helper/scheduleHelper";
import TableComponent from "../../components/ui/table/TableComponent";
import TableHeadComponent from "../../components/ui/table/TableHeadComponent";
import TableRowComponent from "../../components/ui/table/TableRowComponent";
import TableHeadCellComponent from "../../components/ui/table/TableHeadCellComponent";
import TableBodyComponent from "../../components/ui/table/TableBodyComponent";
import TableCellComponent from "../../components/ui/table/TableCellComponent";
import { Button } from "flowbite-react";
import { FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import FromAddStudent from "./FormAddStudent";
import axiosClient from "../../api/axiosClient";
import { showErrorMessage, showSuccessMessage } from "../../helper/toastHelper";

const ClassDetailAdmin = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { classDetail, loading, error } = useAppSelector(
    (state) => state.teacher,
  );
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchClassById(Number(id)));
    }
  }, [dispatch, id]);
  const addStudentsToClass = async (students: number[]) => {
    setIsLoading(true);
    try {
      const response = await axiosClient.post(`teacher/enrollment/${id}/add`, {
        student_ids: students,
      });

      dispatch(fetchClassById(Number(id)));

      showSuccessMessage("Thêm sinh viên thành công");
      setIsLoading(false);
      return response.data;
    } catch {
      showErrorMessage("Lỗi khi thêm sinh viên");
      setIsLoading(false);
    }
  };

  const addStudentsByExcel = async (file: File) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosClient.post(
        `teacher/enrollment/${id}/add-xlsx`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      dispatch(fetchClassById(Number(id)));

      showSuccessMessage("Thêm sinh viên thành công");
      setIsLoading(false);
      return response.data;
    } catch {
      showErrorMessage("Lỗi khi thêm sinh viên");
      setIsLoading(false);
    }
  };

  const handleUploadExcel = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await addStudentsByExcel(file);
  };
  const handleDelete = async (class_session_id: number, student_id: number) => {
    console.log(student_id);
    dispatch(
      deleteStudent({
        class_session_id: class_session_id,
        student_id: student_id,
      }),
    );
  };

  if (error)
    return <div className="mt-10 text-center text-red-500">{error}</div>;

  return (
    <>
      <div className="mx-auto mt-4 max-w-6xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold text-red-700">
          {classDetail.subject_name} ({classDetail.subject_code})
        </h2>
        <p className="text-lg font-semibold text-pink-600">
          📍 Phòng: {classDetail.room}
        </p>
        <p className="text-lg font-semibold text-blue-500">
          📅 Thứ: {getDayOfWeek(Number(classDetail.day_of_week))}
        </p>
        <p className="text-lg font-semibold text-green-600">
          ⏰ Giờ học:{" "}
          <span className="font-bold">{classDetail.start_time}</span> ➝{" "}
          <span className="font-bold">{classDetail.end_time}</span>
        </p>
        <p className="text-lg font-semibold text-purple-600">
          🟣 Thời gian bắt đầu:{" "}
          <span>{formatDateDDMMYY(classDetail.start_date)}</span>
        </p>
        <p className="mb-6 text-lg font-semibold text-yellow-300">
          🟡 Thời gian kết thúc:{" "}
          <span>{formatDateDDMMYY(classDetail.end_date)}</span>
        </p>

        <div className="mb-2 flex gap-2">
          <Button color="green" onClick={() => setIsAddOpen(true)}>
            <FaPlusSquare className="mr-2 h-5 w-5" />
            Sinh viên
          </Button>
          <Button
            color="green"
            onClick={() => document.getElementById("fileUpload")?.click()}
          >
            <FaPlusSquare className="mr-2 h-5 w-5" />
            Danh sách
          </Button>

          <input
            type="file"
            id="fileUpload"
            accept=".xlsx"
            onChange={handleUploadExcel}
            className="hidden"
          />
        </div>

        <TableComponent>
          <TableHeadComponent>
            <TableRowComponent>
              <TableHeadCellComponent
                columnName="id"
                label="STT"
                className="w-[50px] rounded-l-xl"
              />
              <TableHeadCellComponent
                columnName="mssv"
                label="Mã số sinh viên"
              />
              <TableHeadCellComponent columnName="name" label="Họ và Tên" />
              <TableHeadCellComponent columnName="email" label="Email" />
              <TableHeadCellComponent
                columnName="delete"
                label="Xóa"
                className="rounded-r-xl"
              />
            </TableRowComponent>
          </TableHeadComponent>
          <TableBodyComponent>
            {classDetail.students.length > 0 ? (
              classDetail.students.map((student, index) => (
                <TableRowComponent
                  key={student.id}
                  className="bg-gray-50 hover:bg-indigo-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                >
                  <TableCellComponent className="rounded-l-xl border-l-2">
                    {index + 1}
                  </TableCellComponent>
                  <TableCellComponent>{student.mssv}</TableCellComponent>
                  <TableCellComponent>{student.name}</TableCellComponent>
                  <TableCellComponent>{student.email}</TableCellComponent>
                  <TableCellComponent className="rounded-r-xl border-r-2">
                    <button
                      className="cursor-pointer text-neutral-400 hover:text-red-400"
                      onClick={() => {
                        handleDelete(Number(id), student.id);
                      }}
                    >
                      <FaTrashAlt className="h-5 w-5" />
                    </button>
                  </TableCellComponent>
                </TableRowComponent>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  Không có sinh viên nào để hiển thị.
                </td>
              </tr>
            )}
          </TableBodyComponent>
        </TableComponent>
      </div>
      <LoadingModal isOpen={loading} />
      <LoadingModal isOpen={isLoading} />
      <FromAddStudent
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        addStudentToClass={addStudentsToClass}
      />
    </>
  );
};

export default ClassDetailAdmin;
