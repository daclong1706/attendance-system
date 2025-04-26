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
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useEffect, useState } from "react";
import { Class } from "../../types/classType";
import { fetchAllClasses } from "../../store/slices/classReducer";
import LoadingModal from "../../components/modal/LoadingModal";
import ActionComponent from "../../components/ui/ActionComponent";
import { Button } from "flowbite-react";
import SearchComponent from "../../components/ui/SearchComponent";

const ClassManagement = () => {
  const itemsPerPage = 10;

  const dispatch = useAppDispatch();
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { classes, loading } = useAppSelector((state) => state.class);

  useEffect(() => {
    dispatch(fetchAllClasses());
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
            title="Tìm kiếm lớp học"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <div className="mr-2">
            <Button color="green" onClick={() => setIsCreateOpen(true)}>
              <FaPlusSquare className="mr-2 h-5 w-5" />
              Lớp học
            </Button>
          </div>
        </div>

        <TableComponent>
          <TableHeadComponent>
            <TableRowComponent>
              <TableHeadCellComponent
                columnName="id"
                label="STT"
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
                columnName="teacher_name"
                label="Giảng viên"
                onSort={() => handleSort("teacher_name")}
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
                  <TableCellComponent>{d.teacher_name}</TableCellComponent>
                  <TableCellComponent>{d.student_count}</TableCellComponent>
                  <TableCellComponent className="rounded-r-xl border-r-2">
                    <ActionComponent
                      data={d}
                      setSelectedData={setSelectedClass}
                      setIsViewOpen={setIsViewOpen}
                      setIsEditOpen={setIsEditOpen}
                      setIsDeleteOpen={setIsDeleteOpen}
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

export default ClassManagement;
