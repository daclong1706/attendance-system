import { Checkbox, Datepicker, Dropdown, DropdownItem } from "flowbite-react";
import { useState } from "react";
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

  return (
    <section className="my-4">
      <div className="mb-4 flex items-center gap-2">
        <div>
          <Datepicker />
        </div>
        <Dropdown label="Lớp" dismissOnClick={false}>
          <DropdownItem>Công nghệ phần mềm</DropdownItem>
          <DropdownItem>Thực hành nghề nghiệp</DropdownItem>
          <DropdownItem>Lập trình cơ bản</DropdownItem>
        </Dropdown>
      </div>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-indigo-300 text-xs text-gray-900 uppercase dark:bg-indigo-700 dark:text-gray-100">
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
              {users.map((user, index) => (
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
      </div>
    </section>
  );
};

export default Attendance;
