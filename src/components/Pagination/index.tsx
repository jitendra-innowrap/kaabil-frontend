import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handleActive: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handleActive,
}) => {
  const getPaginationGroup = (currentPage: number, totalPages: number) => {
    let paginationGroup: (number | string)[] = [];

    if (totalPages <= 5) {
      paginationGroup = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        paginationGroup = [1, 2, 3, '...', totalPages];
      } else if (currentPage >= totalPages - 2) {
        paginationGroup = [1, '...', totalPages - 2, totalPages - 1, totalPages];
      } else {
        paginationGroup = [1, '...', currentPage, '...', totalPages];
      }
    }

    return paginationGroup;
  };

  const paginationGroup = getPaginationGroup(currentPage, totalPages);

  return (
    <>
      {totalPages > 1 && (
        <ul className="pagination flex w-full justify-center items-center">
          {/* Previous Button */}
          <li
            onClick={() => handleActive(currentPage - 1)}
            className={currentPage === 1 ? "page-item disabled" : "page-item cursor-pointer"}
          >
            <button disabled={currentPage === 1}>
              <MdKeyboardArrowLeft color="#4E5D78" />
            </button>
          </li>

          {/* Page Numbers */}
          {paginationGroup.map((item, index) => (
            <li
              key={index}
              onClick={() => typeof item === 'number' && handleActive(item)}
              className={
                currentPage === item
                  ? "active cursor-pointer"
                  : typeof item === 'string'
                  ? "ellipsis"
                  : " cursor-pointer"
              }
            >
              <button className="page-link" disabled={typeof item === 'string'}>
                {item}
              </button>
            </li>
          ))}

          {/* Next Button */}
          <li
            onClick={() => handleActive(currentPage + 1)}
            className={currentPage === totalPages ? "page-item disabled" : "page-item cursor-pointer"}
          >
            <button disabled={currentPage === totalPages}>
              <MdKeyboardArrowRight color="#4E5D78" />
            </button>
          </li>
        </ul>
      )}
    </>
  );
};

export default Pagination;