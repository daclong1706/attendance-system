import { ReactNode } from "react";

interface TableComponentProps {
  children: ReactNode;
  className?: string;
}

const TableComponent: React.FC<TableComponentProps> = ({
  children,
  className,
}) => {
  const defaultClass =
    "w-full border-separate border-spacing-y-1 rounded-2xl text-left text-sm text-gray-500 dark:text-gray-400";

  return (
    <table className={`${className ? className : defaultClass}`}>
      {children}
    </table>
  );
};

export default TableComponent;
