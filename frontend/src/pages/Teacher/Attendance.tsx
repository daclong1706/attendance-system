import { saveAs } from "file-saver";
import {
  Button,
  Checkbox,
  Datepicker,
  Dropdown,
  DropdownItem,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdQrCode2 } from "react-icons/md";
import { TbFaceId } from "react-icons/tb";
import * as XLSX from "xlsx";
import { showErrorMessage, showSuccessMessage } from "../../helper/toastHelper";
import FaceAttendance from "../Attendance/FaceAttendance";
import QRAttendance from "../Attendance/QRAttendance";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { fetchAllClassesByTeacher } from "../../store/slices/teacherReducer";
import LoadingModal from "../../components/modal/LoadingModal";

const fakeUsers = [
  {
    id: 1,
    studentId: "48.01.104.001",
    name: "Nguyễn Văn A",
    status: "present",
    time: Date.now(),
  },
  {
    id: 2,
    studentId: "48.01.104.002",
    name: "Trần Thị B",
    status: "absent",
    time: Date.now(),
  },
  {
    id: 3,
    studentId: "48.01.104.003",
    name: "Lê Hoàng C",
    status: "late",
    time: Date.now(),
  },
  {
    id: 4,
    studentId: "48.01.104.004",
    name: "Phạm Minh D",
    status: "present",
    time: Date.now(),
  },
  {
    id: 5,
    studentId: "48.01.104.005",
    name: "Bùi Thanh E",
    status: "present",
    time: Date.now(),
  },
  {
    id: 6,
    studentId: "48.01.104.006",
    name: "Đặng Quang F",
    status: "absent",
    time: Date.now(),
  },
  {
    id: 7,
    studentId: "48.01.104.007",
    name: "Hoàng Anh G",
    status: "present",
    time: Date.now(),
  },
  {
    id: 8,
    studentId: "48.01.104.008",
    name: "Ngô Thị H",
    status: "late",
    time: Date.now(),
  },
  {
    id: 9,
    studentId: "48.01.104.009",
    name: "Vũ Văn I",
    status: "present",
    time: Date.now(),
  },
  {
    id: 10,
    studentId: "48.01.104.010",
    name: "Đỗ Khánh J",
    status: "present",
    time: Date.now(),
  },
  {
    id: 11,
    studentId: "48.01.104.011",
    name: "Phan Tuấn K",
    status: "absent",
    time: Date.now(),
  },
  {
    id: 12,
    studentId: "48.01.104.012",
    name: "Lâm Thanh L",
    status: "present",
    time: Date.now(),
  },
  {
    id: 13,
    studentId: "48.01.104.013",
    name: "Nguyễn Thị M",
    status: "late",
    time: Date.now(),
  },
  {
    id: 14,
    studentId: "48.01.104.014",
    name: "Trần Văn N",
    status: "absent",
    time: Date.now(),
  },
  {
    id: 15,
    studentId: "48.01.104.015",
    name: "Đinh Hữu O",
    status: "present",
    time: Date.now(),
  },
  {
    id: 16,
    studentId: "48.01.104.016",
    name: "Phạm Hoàng P",
    status: "late",
    time: Date.now(),
  },
  {
    id: 17,
    studentId: "48.01.104.017",
    name: "Bùi Quang Q",
    status: "present",
    time: Date.now(),
  },
  {
    id: 18,
    studentId: "48.01.104.018",
    name: "Nguyễn Thùy R",
    status: "absent",
    time: Date.now(),
  },
  {
    id: 19,
    studentId: "48.01.104.019",
    name: "Võ Minh S",
    status: "late",
    time: Date.now(),
  },
  {
    id: 20,
    studentId: "48.01.104.020",
    name: "Đào Văn T",
    status: "present",
    time: Date.now(),
  },
];
const Attendance = () => {
  const [users, setUsers] = useState(fakeUsers);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isFaceModalOpen, setIsFaceModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const totalPresent = users.filter((user) => user.status === "present").length;
  const totalAbsent = users.filter((user) => user.status === "absent").length;
  const totalLate = users.filter((user) => user.status === "late").length;

  // Hàm thay đổi trạng thái điểm danh
  const handleStatusChange = (id: number, newStatus: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user,
      ),
    );
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.studentId.includes(searchTerm),
  );

  const handleSaveAttendance = () => {
    const attendanceData = users.map((user) => ({
      studentId: user.studentId,
      name: user.name,
      status: user.status,
    }));

    fetch("/api/attendance/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attendanceData),
    })
      .then((res) => res.json())
      .then((data) => {
        showSuccessMessage("Dữ liệu được lưu thành công");
      })
      .catch(() => showErrorMessage("Lỗi khi lưu dữ liệu"));
  };

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
      prevUsers.map((user) => ({ ...user, status: "present" })),
    );
  };

  const dispatch = useAppDispatch();

  const { classes, loading } = useAppSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(fetchAllClassesByTeacher());
  }, [dispatch]);

  const openQRModal = () => setIsQRModalOpen(true);
  const closeQRModal = () => setIsQRModalOpen(false);
  const openFaceModal = () => setIsFaceModalOpen(true);
  const closeFaceModal = () => setIsFaceModalOpen(false);

  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  return (
    <section className="my-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Khu vực Datepicker, Dropdown và Search (chuyển xuống dưới trên màn hình nhỏ) */}
        <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:flex-nowrap md:items-center md:justify-start">
          <div>
            <Datepicker />
          </div>
          <Dropdown label={selectedClass || "Chọn lớp"}>
            {loading ? (
              <DropdownItem>Đang tải...</DropdownItem>
            ) : (
              classes.map((cls) => (
                <DropdownItem
                  key={cls.id}
                  onClick={() => setSelectedClass(cls.subject_name)}
                >
                  {cls.subject_name}
                </DropdownItem>
              ))
            )}
          </Dropdown>

          {/* Nút tìm kiếm */}
          <div className="w-full md:w-auto">
            <label htmlFor="search">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Tìm kiếm sinh viên"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full rounded-xl border-2 border-[#e7e7e7] bg-white px-4 py-2 pr-12 placeholder:text-neutral-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute top-1/2 right-2 -translate-y-1/2 transform text-gray-600 hover:text-gray-800"
                >
                  <AiOutlineSearch className="h-6 w-6" />
                </button>
              </div>
            </label>
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
              <th className="px-6 py-3 text-center">Vắng</th>
              <th className="px-6 py-3 text-center">Muộn</th>
              <th className="px-6 py-3">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{user.studentId}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4 text-center">
                  <Checkbox
                    color="green"
                    checked={user.status === "present"}
                    onChange={() => handleStatusChange(user.id, "present")}
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <Checkbox
                    color="red"
                    checked={user.status === "absent"}
                    onChange={() => handleStatusChange(user.id, "absent")}
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <Checkbox
                    color="yellow"
                    checked={user.status === "late"}
                    onChange={() => handleStatusChange(user.id, "late")}
                  />
                </td>
                <td className="px-6 py-4">
                  {new Date(user.time).toLocaleTimeString()}
                </td>
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

export default Attendance;
