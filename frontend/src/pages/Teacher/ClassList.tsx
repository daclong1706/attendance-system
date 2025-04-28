import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "../../components/hook/useTable";
import LoadingModal from "../../components/modal/LoadingModal";
import ActionComponent from "../../components/ui/ActionComponent";
import PaginationComponent from "../../components/ui/PanigationComponent";
import SearchComponent from "../../components/ui/SearchComponent";
import TableBodyComponent from "../../components/ui/table/TableBodyComponent";
import TableCellComponent from "../../components/ui/table/TableCellComponent";
import TableComponent from "../../components/ui/table/TableComponent";
import TableHeadCellComponent from "../../components/ui/table/TableHeadCellComponent";
import TableHeadComponent from "../../components/ui/table/TableHeadComponent";
import TableRowComponent from "../../components/ui/table/TableRowComponent";
import { getClassStatus } from "../../helper/scheduleHelper";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { fetchAllClassesByTeacher } from "../../store/slices/teacherReducer";
import { Class } from "../../types/classType";

const ClassList = () => {
  const itemsPerPage = 10;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  useEffect(() => {
    if (isViewOpen && selectedClass?.id) {
      navigate(`${selectedClass.id}`);
    }
  }, [isViewOpen, selectedClass, navigate]);

  const { classes, loading } = useAppSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(fetchAllClassesByTeacher());
  }, [dispatch]);

  const {
    paginatedData: data,
    totalItems,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    handleSort,
    sortColumn,
    sortDirection,
  } = useTable({ data: classes || [], itemsPerPage });

  return (
    <div className="mx-auto hidden max-w-6xl p-4 md:block">
      <div className="overflow-x-auto sm:rounded-lg">
        <div className="mt-2 mb-6 flex flex-row justify-between">
          <SearchComponent
            title="Tìm kiếm học phần"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        <TableComponent>
          <TableHeadComponent>
            <TableRowComponent>
              <TableHeadCellComponent
                columnName="id"
                label="ID"
                className="w-[150px] rounded-l-xl"
              />
              <TableHeadCellComponent
                columnName="subject_code"
                label="Mã Học Phần"
              />
              <TableHeadCellComponent
                columnName="subject_name"
                label="Học phần"
                onSort={() => handleSort("subject_name")}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
              />
              <TableHeadCellComponent
                columnName="student_count"
                label="Số lượng sinh viên"
                onSort={() => handleSort("student_count")}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
              />
              <TableHeadCellComponent columnName="status" label="Trạng thái" />
              <TableHeadCellComponent
                columnName="action"
                className="rounded-r-xl"
              />
            </TableRowComponent>
          </TableHeadComponent>
          <TableBodyComponent>
            {data.length > 0 ? (
              data.map((d) => (
                <TableRowComponent
                  key={d.id}
                  className="bg-gray-50 hover:bg-indigo-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                >
                  <TableCellComponent className="rounded-l-xl border-l-2">
                    {d.id}
                  </TableCellComponent>
                  <TableCellComponent>{d.subject_code}</TableCellComponent>
                  <TableCellComponent>{d.subject_name}</TableCellComponent>
                  <TableCellComponent>{d.student_count}</TableCellComponent>
                  <TableCellComponent>
                    <div
                      className={`rounded-full px-2 py-1 text-center font-medium ${
                        getClassStatus(d.start_date, d.end_date) ===
                        "Đang hoạt động"
                          ? "bg-green-500 text-white"
                          : getClassStatus(d.start_date, d.end_date) ===
                              "Chưa bắt đầu"
                            ? "bg-blue-500 text-white"
                            : "bg-red-500 text-white"
                      }`}
                    >
                      {getClassStatus(d.start_date, d.end_date)}
                    </div>
                  </TableCellComponent>
                  <TableCellComponent className="rounded-r-xl border-r-2">
                    <ActionComponent
                      data={d}
                      setSelectedData={setSelectedClass}
                      setIsViewOpen={setIsViewOpen}
                    />
                  </TableCellComponent>
                </TableRowComponent>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  Không có lớp học nào để hiển thị.
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
      <LoadingModal isOpen={loading} />
    </div>
  );
};

export default ClassList;
