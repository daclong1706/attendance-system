import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useTable } from "../../components/hook/useTable";
import DeleteModal from "../../components/modal/DeleteModal";
import LoadingModal from "../../components/modal/LoadingModal";
import PaginationComponent from "../../components/ui/PanigationComponent";
import SearchComponent from "../../components/ui/SearchComponent";
import TableBodyComponent from "../../components/ui/table/TableBodyComponent";
import TableCellComponent from "../../components/ui/table/TableCellComponent";
import TableComponent from "../../components/ui/table/TableComponent";
import TableHeadCellComponent from "../../components/ui/table/TableHeadCellComponent";
import TableHeadComponent from "../../components/ui/table/TableHeadComponent";
import TableRowComponent from "../../components/ui/table/TableRowComponent";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { fetchAllUsers } from "../../store/slices/userReducer";
import { User } from "../../types/userTypes";
import CreateUserForm from "./CreateUserForm";
import EditUserForm from "./EditUserForm";
import ViewUserForm from "./ViewUserForm";
import ActionComponent from "../../components/ui/ActionComponent";
import { FaPlusSquare } from "react-icons/fa";

const Home = () => {
  const itemsPerPage = 10;
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { users, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUsers());
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
  } = useTable({ data: users || [], itemsPerPage });

  return (
    <div className="mx-auto mt-4 max-w-6xl p-4 md:block">
      <div className="overflow-x-auto sm:rounded-lg">
        <div className="mt-2 mb-6 flex flex-row justify-between">
          <SearchComponent
            title="Tìm kiếm người dùng"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <div className="mr-2">
            <Button color="green" onClick={() => setIsCreateOpen(true)}>
              <FaPlusSquare className="mr-2 h-5 w-5" />
              Tài khoản
            </Button>
          </div>
        </div>

        <TableComponent>
          <TableHeadComponent>
            <TableRowComponent>
              <TableHeadCellComponent
                className="rounded-l-xl"
                columnName="name"
                label="ID"
              />
              <TableHeadCellComponent
                columnName="name"
                label="Họ tên"
                onSort={() => handleSort("name")}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
              />
              <TableHeadCellComponent
                columnName="mssv"
                label="Mã số"
                onSort={() => handleSort("mssv")}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
              />
              <TableHeadCellComponent
                columnName="role"
                label="Phân quyền"
                onSort={() => handleSort("role")}
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
              data.map((user) => (
                <TableRowComponent
                  key={user.id}
                  className="bg-gray-50 hover:bg-indigo-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                >
                  <TableCellComponent
                    className="rounded-l-xl border-l-2"
                    title={user.id.toString()}
                  >
                    {user.id}
                  </TableCellComponent>
                  <TableCellComponent className="flex items-center">
                    {user?.avatar ? (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.avatar}
                        alt={user.name}
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-200">
                        {user?.name
                          ? user.name
                              .trim()
                              .split(" ")
                              .slice(-1)[0][0]
                              .toUpperCase()
                          : ""}
                      </div>
                    )}
                    <div className="ps-3">
                      <div className="text-base font-semibold">{user.name}</div>
                      <div className="font-normal text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </TableCellComponent>

                  <TableCellComponent>{user.mssv}</TableCellComponent>
                  <TableCellComponent>{user.role}</TableCellComponent>

                  <TableCellComponent className="rounded-r-xl border-r-2">
                    <ActionComponent<User>
                      data={user}
                      setSelectedData={setSelectedUser}
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
      <LoadingModal isOpen={loading} />
      <CreateUserForm
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
      {selectedUser && (
        <DeleteModal
          userName={selectedUser.name}
          userID={selectedUser.id}
          openModal={isDeleteOpen}
          setOpenModal={setIsDeleteOpen}
        />
      )}
      {selectedUser && (
        <EditUserForm
          user={selectedUser}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}
      \
      {selectedUser && (
        <ViewUserForm
          user={selectedUser}
          openModal={isViewOpen}
          setOpenModal={setIsViewOpen}
        />
      )}
    </div>
  );
};

export default Home;
