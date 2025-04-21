import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PaginationComponent = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: Props) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <nav
      className="flex-column flex flex-wrap items-center justify-between pt-4 md:flex-row"
      aria-label="Table navigation"
    >
      <span className="mb-4 block w-full text-sm font-normal text-gray-500 md:mb-0 md:inline md:w-auto dark:text-gray-400">
        Hiển thị{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </span>{" "}
        trong tổng số{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalItems}
        </span>
      </span>
      <ul className="inline-flex h-8 text-sm">
        <li>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex h-8 items-center justify-center px-3 ${
              currentPage === 1
                ? "cursor-not-allowed text-gray-400"
                : "text-gray-500 hover:text-gray-700"
            } rounded-s-lg border border-gray-300 bg-white`}
          >
            <FaChevronLeft />
          </button>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li key={index}>
            <button
              onClick={() => setCurrentPage(index + 1)}
              className={`flex h-8 items-center justify-center border border-gray-300 px-3 ${
                currentPage === index + 1
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex h-8 items-center justify-center px-3 ${
              currentPage === totalPages
                ? "cursor-not-allowed text-gray-400"
                : "text-gray-500 hover:text-gray-700"
            } rounded-e-lg border border-gray-300 bg-white`}
          >
            <FaChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
