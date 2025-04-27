import { useState } from "react";

interface Props<T> {
  data: T[];
  itemsPerPage: number;
}

export const useTable = <T extends Record<string, any>>({
  data,
  itemsPerPage,
}: Props<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | "">("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | "">("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredData = Array.isArray(data)
    ? data.filter(
        (item) =>
          item &&
          typeof item === "object" &&
          Object.values(item).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      )
    : [];

  // Sắp xếp danh sách
  const sortedData =
    sortColumn && sortDirection
      ? [...filteredData].sort((a, b) => {
          const valueA = a[sortColumn];
          const valueB = b[sortColumn];

          if (typeof valueA === "string" && typeof valueB === "string") {
            return sortDirection === "asc"
              ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
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
  const handleSort = (column: keyof T) => {
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
