import { ReactNode } from "react";

interface TableCellProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

const TableCellComponent: React.FC<TableCellProps> = ({
  children,
  className,
  title,
}) => {
  return (
    <td
      className={`border-y-2 border-neutral-200 px-6 py-4 ${className}`} // bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-600
      title={title}
    >
      {children}
    </td>
  );
};

export default TableCellComponent;
