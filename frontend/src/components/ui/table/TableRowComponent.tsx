import { ReactNode } from "react";

interface TableRowProps {
  children: ReactNode;
  className?: string;
}

const TableRowComponent: React.FC<TableRowProps> = ({
  children,
  className,
}) => {
  return (
    <tr
      className={`${className}`} // bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-600
    >
      {children}
    </tr>
  );
};

export default TableRowComponent;
