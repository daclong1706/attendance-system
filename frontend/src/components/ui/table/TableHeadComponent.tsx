import { ReactNode } from "react";

interface TableHeadProps {
  children: ReactNode;
  className?: string;
}

const TableHeadComponent: React.FC<TableHeadProps> = ({
  children,
  className,
}) => {
  return (
    <thead
      className={`bg-indigo-400 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 ${className}`}
    >
      {children}
    </thead>
  );
};

export default TableHeadComponent;
