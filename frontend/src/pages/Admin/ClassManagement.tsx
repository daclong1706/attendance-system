import { AiOutlineSearch } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import { useTable } from "../../components/hook/useTable";
import PaginationComponent from "../../components/ui/PanigationComponent";
import TableBodyComponent from "../../components/ui/table/TableBodyComponent";
import TableCellComponent from "../../components/ui/table/TableCellComponent";
import TableComponent from "../../components/ui/table/TableComponent";
import TableHeadCellComponent from "../../components/ui/table/TableHeadCellComponent";
import TableHeadComponent from "../../components/ui/table/TableHeadComponent";
import TableRowComponent from "../../components/ui/table/TableRowComponent";

const data = [
  {
    id: "IT101",
    name: "Khoa học máy tính",
    lecturer: "Nguyễn Văn A",
    semester: "HK2 - 2025",
    student_count: 45,
    status: "Đang học",
    students: [
      { student_id: "SV001", name: "Phạm Minh Anh", status: "Có mặt" },
      { student_id: "SV002", name: "Nguyễn Thị Lan", status: "Vắng mặt" },
      { student_id: "SV003", name: "Trần Quốc Đạt", status: "Có mặt" },
      { student_id: "SV004", name: "Đỗ Hoài Nam", status: "Muộn" },
    ],
  },
  {
    id: "IT202",
    name: "Công nghệ thông tin",
    lecturer: "Trần Bích Ngọc",
    semester: "HK1 - 2025",
    student_count: 38,
    status: "Đang học",
    students: [
      { student_id: "SV005", name: "Lê Văn Hưng", status: "Có mặt" },
      { student_id: "SV006", name: "Trần Thị Mai", status: "Có mặt" },
      { student_id: "SV007", name: "Ngô Hoàng Phúc", status: "Vắng mặt" },
      { student_id: "SV008", name: "Phan Thị Thảo", status: "Muộn" },
    ],
  },
];

const ClassManagement = () => {
  const itemsPerPage = 10;

  const {
    paginatedData: classes,
    totalItems,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    handleSort,
    sortColumn,
    sortDirection,
  } = useTable({ data: data || [], itemsPerPage });

  console.log(classes);

  return (
    <div className="mx-auto hidden max-w-6xl p-4 md:block">
      <div className="overflow-x-auto sm:rounded-lg">
        <div className="mb-6 flex flex-row justify-between">
          <label htmlFor="search">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm lớp học"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border-2 border-[#e7e7e7] bg-white px-4 py-2 pr-12 placeholder:text-neutral-400 focus:border-indigo-500 focus:outline-none"
              />

              {/* Search Icon */}
              <button
                type="submit"
                className="absolute top-1/2 right-2 -translate-y-1/2 transform text-gray-600 hover:text-gray-800"
              >
                <AiOutlineSearch className="h-6 w-6" />
              </button>
            </div>
          </label>
          {/* <Link to="add-book" className="font-medium uppercase"> */}
          <div>
            <button className="bg-create-100 hover:bg-create-200 flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-white">
              <FaPlusSquare className="h-5 w-5" />
              Sách
            </button>
          </div>
          {/* </Link> */}
        </div>

        <TableComponent>
          <TableHeadComponent>
            <TableRowComponent>
              <TableHeadCellComponent
                columnName="id"
                label="Mã Học Phần"
                className="w-[150px] rounded-l-xl"
              />
              <TableHeadCellComponent
                columnName="name"
                label="Học phần"
                onSort={() => handleSort("name")}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
              />
              <TableHeadCellComponent
                columnName="lecturer"
                label="Giảng viên"
                onSort={() => handleSort("lecturer")}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
              />
              <TableHeadCellComponent
                columnName="student_count"
                label="Số lượng"
                onSort={() => handleSort("student_count")}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
              />
              <TableHeadCellComponent
                columnName="action"
                className="rounded-r-xl"
              />
            </TableRowComponent>
          </TableHeadComponent>
          <TableBodyComponent>
            {classes.length > 0 ? (
              classes.map((c) => (
                <TableRowComponent
                  key={c.id}
                  className="bg-gray-50 hover:bg-indigo-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                >
                  <TableCellComponent className="rounded-l-xl border-l-2">
                    {c.id}
                  </TableCellComponent>
                  <TableCellComponent>{c.name}</TableCellComponent>
                  <TableCellComponent>{c.lecturer}</TableCellComponent>
                  <TableCellComponent>{c.student_count}</TableCellComponent>
                  <TableCellComponent className="rounded-r-xl border-r-2">
                    <div className="flex flex-row items-center justify-center gap-3">
                      <button className="cursor-pointer text-neutral-400 hover:text-blue-400"></button>
                      <button className="cursor-pointer text-neutral-400 hover:text-green-400"></button>
                    </div>
                  </TableCellComponent>
                </TableRowComponent>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  Không có người dùng nào để hiển thị.
                </td>
              </tr>
            )}
          </TableBodyComponent>
        </TableComponent>

        <PaginationComponent
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ClassManagement;
