import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// import "./styles.css";

interface PaginationProps {
    currentPage: number;
    getPaginationGroup: number[];
    pages: number;
    handleActive: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    getPaginationGroup,
    pages,
    handleActive,
}) => {
    return (
        <>
            {pages > 1 && (
                <ul className="pagination flex w-full justify-center items-center">
                    {/* Previous Button */}
                    {  (
                        <li onClick={() => handleActive(currentPage - 1)} className={currentPage == 1?"page-item disabled":"page-item"}>
                            <button disabled={currentPage == 1} >
                            <MdKeyboardArrowLeft color="#4E5D78"/>
                            </button>
                        </li>
                    )}

                    {/* Page Numbers */}
                    {getPaginationGroup.map((item) => (
                        <li
                            onClick={() => handleActive(item)}
                            key={item} // Use item as key if it's unique
                            className={currentPage === item ? "active" : ""}
                        >
                            <button className="page-link">{item}</button>
                        </li>
                    ))}

                    {/* Next Button */}
                    {(
                        <li onClick={() => handleActive(currentPage + 1)} className={currentPage == pages?"page-item disabled":"page-item "}>
                            <button disabled={currentPage == pages}>
                                <MdKeyboardArrowRight color="#4E5D78"/>
                            </button>
                        </li>
                    )}
                </ul>
            )}
        </>
    );
};

export default Pagination;