import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
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
                <ul className="flex w-full justify-center items-center">
                    {/* Previous Button */}
                    {currentPage > 1 && (
                        <li onClick={() => handleActive(currentPage - 1)} className="page-item">
                            <button className="grid rounded-s-lg place-items-center size-7 w-6 md:size-8 md:w-9 border border-[#CFD6DC]">
                            <BsArrowLeft color="#4E5D78"/>
                            </button>
                        </li>
                    )}

                    {/* Page Numbers */}
                    {getPaginationGroup.map((item) => (
                        <li
                            onClick={() => handleActive(item)}
                            key={item} // Use item as key if it's unique
                            className={currentPage === item ? "text-white grid place-items-center bg-[#E41C3B] rounded-full size-8 md:size-9" : " grid place-items-center border border-[#CFD6DC] size-7 md:size-8 text-[#4E5D78]"}
                        >
                            <button className="page-link">{item}</button>
                        </li>
                    ))}

                    {/* Next Button */}
                    {currentPage < pages && (
                        <li onClick={() => handleActive(currentPage + 1)} className="page-item">
                            <button className="grid rounded-e-lg place-items-center size-7 w-6 md:size-8 md:w-9 border border-[#CFD6DC]">
                                <BsArrowRight color="#4E5D78"/>
                            </button>
                        </li>
                    )}
                </ul>
            )}
        </>
    );
};

export default Pagination;