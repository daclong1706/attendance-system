import { useEffect, useState } from "react";
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

import { Button } from "flowbite-react";
import LoadingModal from "../../components/modal/LoadingModal";
import SearchComponent from "../../components/ui/SearchComponent";
import { fetchAllSubjects } from "../../store/slices/subjectReducer";
import { Subject } from "../../types/subjectType";
import ActionComponent from "../../components/ui/ActionComponent";
import DeleteModal from "../../components/modal/DeleteModal";
import CreateSubjectForm from "./CreateSubjectFrom";
import EditSubjectForm from "./EditSubjectForm";

const SubjectManagement = () => {
  const itemsPerPage = 10;

  const dispatch = useAppDispatch();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { subjects, loading } = useAppSelector((state) => state.subject);

  useEffect(() => {
    dispatch(fetchAllSubjects());
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
  } = useTable({ data: subjects || [], itemsPerPage });

  return (
    <div className="mx-auto hidden max-w-6xl p-4 md:block">
      <div className="overflow-x-auto sm:rounded-lg">
        <div className="mt-2 mb-6 flex flex-row justify-between">
          <SearchComponent
            title="Tìm kiếm học phần"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <div className="mr-2">
            <Button color="green" onClick={() => setIsCreateOpen(true)}>
              <FaPlusSquare className="mr-2 h-5 w-5" />
              Học phần
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
                columnName="code"
                label="Mã Học Phần"
                onSort={() => handleSort("code")}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
              />
              <TableHeadCellComponent
                columnName="name"
                label="Học phần"
                onSort={() => handleSort("name")}
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
                  <TableCellComponent>{d.code}</TableCellComponent>
                  <TableCellComponent>{d.name}</TableCellComponent>
                  <TableCellComponent className="rounded-r-xl border-r-2">
                    <ActionComponent
                      data={d}
                      setSelectedData={setSelectedSubject}
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
                  Không có học phần nào để hiển thị.
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
      <CreateSubjectForm
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
      {selectedSubject && (
        <EditSubjectForm
          subject={selectedSubject}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}
      {selectedSubject && (
        <DeleteModal
          dataType="Subject"
          dataName={selectedSubject.name}
          dataID={selectedSubject.id}
          openModal={isDeleteOpen}
          setOpenModal={setIsDeleteOpen}
        />
      )}
    </div>
  );
};

export default SubjectManagement;
