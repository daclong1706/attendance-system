import { ReactNode } from "react";

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

const TableBodyComponent: React.FC<TableBodyProps> = ({
  children,
  className,
}) => {
  return <tbody className={`${className}`}>{children}</tbody>;
};

export default TableBodyComponent;
