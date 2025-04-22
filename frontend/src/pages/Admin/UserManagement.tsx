import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import { useTable } from "../../components/hook/useTable";
import SortIcon from "../../components/ui/SortIcon";
import PaginationComponent from "../../components/ui/PanigationComponent";

const data = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    role: "admin",
    status: "active",
    created_at: "2024-04-01",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    role: "teacher",
    status: "active",
    created_at: "2024-03-28",
  },
  {
    id: 3,
    name: "Lê Hoàng C",
    email: "lehoangc@example.com",
    role: "teacher",
    status: "inactive",
    created_at: "2024-03-15",
  },
  {
    id: 4,
    name: "Phạm Minh D",
    email: "phamminhd@example.com",
    role: "student",
    status: "active",
    created_at: "2024-03-10",
  },
  {
    id: 5,
    name: "Bùi Thanh E",
    email: "buithanhe@example.com",
    role: "student",
    status: "inactive",
    created_at: "2024-02-20",
  },
  {
    id: 6,
    name: "Đặng Quang F",
    email: "dangquangf@example.com",
    role: "admin",
    status: "active",
    created_at: "2024-02-01",
  },
  {
    id: 7,
    name: "Hoàng Anh G",
    email: "hoanganhg@example.com",
    role: "teacher",
    status: "active",
    created_at: "2024-01-15",
  },
  {
    id: 8,
    name: "Ngô Thị H",
    email: "ngothih@example.com",
    role: "student",
    status: "active",
    created_at: "2024-01-10",
  },
  {
    id: 9,
    name: "Vũ Văn I",
    email: "vuvani@example.com",
    role: "student",
    status: "inactive",
    created_at: "2023-12-25",
  },
  {
    id: 10,
    name: "Đỗ Khánh J",
    email: "dokhanhj@example.com",
    role: "teacher",
    status: "active",
    created_at: "2023-12-05",
  },
  {
    id: 11,
    name: "Phan Tuấn K",
    email: "phantuan@example.com",
    role: "student",
    status: "active",
    created_at: "2023-11-20",
  },
  {
    id: 12,
    name: "Lâm Thanh L",
    email: "lamthanhl@example.com",
    role: "admin",
    status: "active",
    created_at: "2023-10-30",
  },
];

const Home = () => {
  const itemsPerPage = 10;

  const {
    paginatedData: users,
    totalItems,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    handleSort,
    sortColumn,
    sortDirection,
  } = useTable({ data: data || [], itemsPerPage });

  return (
    <div className="mx-auto hidden max-w-6xl p-4 md:block">
      <div className="overflow-x-auto sm:rounded-lg">
        <div className="mb-6 flex flex-row justify-between">
          <label htmlFor="search">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm người dùng"
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

        <table className="w-full border-separate border-spacing-y-1 text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-indigo-400 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="cursor-pointer rounded-l-xl px-6 py-3"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center space-x-2">
                  {/* <span></span>
                  <SortIcon
                    sortColumn={sortColumn}
                    columnName="name"
                    sortDirection={sortDirection}
                  /> */}
                </div>
              </th>
              <th
                scope="col"
                className="cursor-pointer px-6 py-3"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center space-x-2">
                  <span>Tên</span>
                  <SortIcon
                    sortColumn={sortColumn}
                    columnName="name"
                    sortDirection={sortDirection}
                  />
                </div>
              </th>
              <th
                scope="col"
                className="cursor-pointer px-6 py-3"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center space-x-2">
                  <span>Email</span>
                  <SortIcon
                    sortColumn={sortColumn}
                    columnName="email"
                    sortDirection={sortDirection}
                  />
                </div>
              </th>
              <th
                scope="col"
                className="cursor-pointer px-6 py-3"
                onClick={() => handleSort("role")}
              >
                <div className="flex items-center space-x-2">
                  <span>Phân Quyền</span>
                  <SortIcon
                    sortColumn={sortColumn}
                    columnName="role"
                    sortDirection={sortDirection}
                  />
                </div>
              </th>

              <th scope="col" className="rounded-r-xl px-6 py-3">
                <div className="flex justify-center">Thao tác</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="bg-gray-50 hover:bg-indigo-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                >
                  <td
                    className="w-4 rounded-l-xl border-y-2 border-l-2 border-neutral-200 p-4"
                    style={{
                      maxWidth: "150px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={user.id}
                  >
                    {user.id}
                  </td>
                  <td
                    scope="row"
                    className="flex items-center border-y-2 border-neutral-200 px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white"
                  >
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
                  </td>

                  <td className="border-y-2 border-neutral-200 px-6 py-4">
                    {user.email}
                  </td>

                  <td className="border-y-2 border-neutral-200 px-6 py-4">
                    <div
                      className="font-normal text-gray-500"
                      title={user.role}
                    >
                      {user.role}
                    </div>
                  </td>

                  <td className="rounded-r-xl border-y-2 border-r-2 border-neutral-200 px-6 py-4">
                    <div className="flex flex-row items-center justify-center gap-3">
                      <button className="cursor-pointer text-neutral-400 hover:text-blue-400"></button>
                      <button className="cursor-pointer text-neutral-400 hover:text-green-400"></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  Không có người dùng nào để hiển thị.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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

export default Home;
