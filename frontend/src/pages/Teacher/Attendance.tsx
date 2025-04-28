import { saveAs } from "file-saver";
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  Select,
} from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import { MdQrCode2 } from "react-icons/md";
import { TbFaceId } from "react-icons/tb";
import * as XLSX from "xlsx";
import { showErrorMessage, showSuccessMessage } from "../../helper/toastHelper";
import FaceAttendance from "../Attendance/FaceAttendance";
import QRAttendance from "../Attendance/QRAttendance";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  fetchAllClassesByTeacher,
  fetchAttendanceByClass,
  saveAttendance,
} from "../../store/slices/teacherReducer";
import LoadingModal from "../../components/modal/LoadingModal";
import { Class } from "../../types/classType";
import { Attendance } from "../../types/attendanceTypes";
import SearchComponent from "../../components/ui/SearchComponent";
import {
  formatDateString,
  getMatchingDates,
} from "../../helper/scheduleHelper";

const AttendanceTeacher = () => {
  const dispatch = useAppDispatch();
  const { classes, loading, attendanceList } = useAppSelector(
    (state) => state.teacher,
  );

  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isFaceModalOpen, setIsFaceModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<Class | null>(classes[0]);
  const [selectedDate, setSelectedDate] = useState<string>(
    classes.length > 0
      ? formatDateString(classes[0].start_date)
      : new Date().toISOString().split("T")[0],
  );

  useEffect(() => {
    dispatch(fetchAllClassesByTeacher());
  }, [dispatch]);

  useEffect(() => {
    if (classes.length > 0 && !selectedClass) {
      setSelectedClass(classes[0]);
      const format = formatDateString(classes[0].start_date);
      setSelectedDate(format);
    }
  }, [classes]);

  useEffect(() => {
    if (attendanceList.length > 0) {
      setUsers(attendanceList);
    } else {
      setUsers(attendanceList);
    }
  }, [attendanceList]);

  useEffect(() => {
    if (selectedClass) {
      const dayOfWeek = new Date(selectedDate).getDay();
      console.log(selectedDate, dayOfWeek, selectedClass.id);
      dispatch(
        fetchAttendanceByClass({
          class_section_id: selectedClass.id,
          selected_date: selectedDate,
          day_of_week: dayOfWeek,
        }),
      );
    }
  }, [selectedClass, selectedDate, dispatch]);

  const openQRModal = () => setIsQRModalOpen(true);
  const closeQRModal = () => setIsQRModalOpen(false);
  const openFaceModal = () => setIsFaceModalOpen(true);
  const closeFaceModal = () => setIsFaceModalOpen(false);

  const handleExportData = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "attendance.xlsx");
  };

  const handleMarkAllPresent = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => ({ ...user, attendance_status: "present" })),
    );
  };

  const matchedDates = useMemo(() => {
    if (!selectedClass) return [];

    return getMatchingDates(
      selectedClass.start_date,
      selectedClass.end_date,
      selectedClass.day_of_week,
    );
  }, [selectedClass]);

  const [users, setUsers] = useState<Attendance[]>(attendanceList);

  const totalPresent = users.filter(
    (user) => user.attendance_status === "present",
  ).length;
  const totalAbsent = users.filter(
    (user) => user.attendance_status === "absent",
  ).length;
  const totalExcusedAbsence = users.filter(
    (user) => user.attendance_status === "excused_absence",
  ).length;
  const totalLate = users.filter(
    (user) => user.attendance_status === "late",
  ).length;

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mssv.includes(searchTerm),
  );

  // Hàm thay đổi trạng thái điểm danh
  const handleStatusChange = (
    id: number,
    newStatus:
      | "present"
      | "absent"
      | "excused_absence"
      | "late"
      | "not_recorded",
  ) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, attendance_status: newStatus } : user,
      ),
    );
  };

  const handleSaveAttendance = () => {
    try {
      if (selectedClass) {
        const dayOfWeek = new Date(selectedDate).getDay();
        const attendanceData = users.map((user) => ({
          id: user.id,
          status: user.attendance_status,
        }));
        dispatch(
          saveAttendance({
            class_section_id: selectedClass.id,
            selected_date: selectedDate,
            day_of_week: dayOfWeek,
            students: attendanceData,
          }),
        );
      }
      showSuccessMessage("Thông tin điểm danh đã được lưu");
    } catch {
      showErrorMessage("Không thể lưu thông tin điểm danh");
    }
  };

  return (
    <section className="my-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:flex-nowrap md:items-center md:justify-start">
          {/* Date */}
          <div className="w-48 max-w-md">
            <Select
              id="dates"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            >
              {matchedDates.length > 0 ? (
                matchedDates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))
              ) : (
                <option disabled>Không có ngày phù hợp</option>
              )}
            </Select>
          </div>

          {/* Class */}
          <Dropdown
            label={selectedClass ? selectedClass.subject_name : "Chọn lớp"}
          >
            {loading ? (
              <DropdownItem>Đang tải...</DropdownItem>
            ) : (
              classes.map((cls) => (
                <DropdownItem
                  key={cls.id}
                  onClick={() => setSelectedClass(cls)}
                >
                  {cls.subject_name}
                </DropdownItem>
              ))
            )}
          </Dropdown>

          {/* Search */}
          <div className="w-full md:w-auto">
            <SearchComponent
              title="Tìm kiếm sinh viên"
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </div>

        {/* Khu vực nút Face & QR Code (luôn nằm trên) */}
        <div className="flex w-full justify-center gap-2 md:w-auto md:justify-end">
          <Button onClick={openFaceModal}>
            <TbFaceId className="mr-2 h-5 w-5" />
            Face
          </Button>
          <Button onClick={openQRModal}>
            <MdQrCode2 className="mr-2 h-5 w-5" />
            QR Code
          </Button>
        </div>
      </div>

      <div className="relative my-4 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-red bg-indigo-300 text-xs text-gray-900 uppercase dark:bg-indigo-700 dark:text-gray-100">
            <tr>
              <th className="px-6 py-3">STT</th>
              <th className="px-6 py-3">Mã số sinh viên</th>
              <th className="px-6 py-3">Họ và tên</th>
              <th className="px-6 py-3 text-center">Có mặt</th>
              <th className="px-6 py-3 text-center">Nghỉ có phép</th>
              <th className="px-6 py-3 text-center">Nghỉ không phép</th>
              <th className="px-6 py-3">Muộn</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{user.mssv}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4 text-center">
                  <Checkbox
                    color="green"
                    checked={user.attendance_status === "present"}
                    onChange={() => handleStatusChange(user.id, "present")}
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <Checkbox
                    color="blue"
                    checked={user.attendance_status === "absent"}
                    onChange={() => handleStatusChange(user.id, "absent")}
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <Checkbox
                    color="red"
                    checked={user.attendance_status === "excused_absence"}
                    onChange={() =>
                      handleStatusChange(user.id, "excused_absence")
                    }
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <Checkbox
                    color="yellow"
                    checked={user.attendance_status === "late"}
                    onChange={() => handleStatusChange(user.id, "late")}
                  />
                </td>
                {/* <td className="px-6 py-4">
                  {new Date(user.email).toLocaleTimeString()}
                </td> */}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 text-center text-gray-700 dark:bg-gray-700 dark:text-gray-50">
              <td colSpan={3} className="px-6 py-4 font-medium">
                Tổng
              </td>
              <td className="px-6 py-4">{totalPresent}</td>
              <td className="px-6 py-4">{totalAbsent}</td>
              <td className="px-6 py-4">{totalExcusedAbsence}</td>
              <td className="px-6 py-4">{totalLate}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-start space-x-4">
        <Button onClick={handleSaveAttendance}>Lưu dữ liệu</Button>
        <Button color="green" onClick={handleExportData}>
          Xuất danh sách
        </Button>
        <Button color="yellow" outline onClick={handleMarkAllPresent}>
          Điểm danh tất cả
        </Button>
      </div>
      {isQRModalOpen && <QRAttendance onClose={closeQRModal} />}
      {isFaceModalOpen && <FaceAttendance onClose={closeFaceModal} />}
      <LoadingModal isOpen={loading} />
    </section>
  );
};

export default AttendanceTeacher;
