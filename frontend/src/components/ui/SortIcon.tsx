import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

interface SortIconProps {
  sortColumn: string;
  columnName: string;
  sortDirection: "asc" | "desc" | "";
}

const SortIcon: React.FC<SortIconProps> = ({
  sortColumn,
  columnName,
  sortDirection,
}) => {
  if (sortColumn === columnName) {
    if (sortDirection === "asc") {
      return <FaSortDown />;
    } else if (sortDirection === "desc") {
      return <FaSortUp />;
    }
  }
  return <FaSort />;
};

export default SortIcon;
