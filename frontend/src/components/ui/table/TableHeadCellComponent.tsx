import SortIcon from "../SortIcon";

interface TableHeadCellProps {
  columnName: string;
  label?: string;
  onSort?: () => void;
  sortColumn?: string;
  sortDirection?: "asc" | "desc" | "";
  className?: string;
}

const TableHeadCellComponent: React.FC<TableHeadCellProps> = ({
  columnName,
  label,
  onSort,
  sortColumn,
  sortDirection,
  className,
}) => {
  return (
    <th
      scope="col"
      className={`cursor-pointer px-6 py-3 ${className}`}
      onClick={onSort}
    >
      <div className="flex items-center space-x-2">
        <span>{label}</span>
        {onSort && sortColumn && (
          <SortIcon
            sortColumn={sortColumn}
            columnName={columnName}
            sortDirection={sortDirection}
          />
        )}
      </div>
    </th>
  );
};

export default TableHeadCellComponent;
