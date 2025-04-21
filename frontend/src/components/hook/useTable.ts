import { useState } from "react";

interface DataItem {
  [key: string]: any;
}

interface Props {
  data: DataItem[];
  itemsPerPage: number;
}

export const useTable = ({ data, itemsPerPage }: Props) => {
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | "">("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Lọc danh sách theo từ khóa tìm kiếm
  const filteredData = data.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Sắp xếp danh sách
  const sortedData = sortDirection
    ? [...filteredData].sort((a, b) => {
        const valueA = a[sortColumn]?.toLowerCase?.() || a[sortColumn];
        const valueB = b[sortColumn]?.toLowerCase?.() || b[sortColumn];

        if (valueA && valueB) {
          if (sortDirection === "asc") {
            return valueA > valueB ? 1 : -1;
          } else {
            return valueA < valueB ? 1 : -1;
          }
        }
        return 0;
      })
    : filteredData;

  // Phân trang
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalItems = sortedData.length;

  // Hàm sắp xếp
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(
        sortDirection === "asc"
          ? "desc"
          : sortDirection === "desc"
            ? ""
            : "asc",
      );
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return {
    paginatedData,
    totalItems,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    handleSort,
    sortColumn,
    sortDirection,
  };
};
