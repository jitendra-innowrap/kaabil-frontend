import Link from "next/link";
import React from "react";
import { HiChevronRight } from "react-icons/hi";
import { RxChevronRight } from "react-icons/rx";

// Define the props interface with appropriate types
interface BreadcrumbProps {
  root: string;
  category?: string;
  subCategory?: string; // Optional
  subcategory2?: string; // Optional
  subcategory3?: string; // Optional
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  root,
  category,
  subCategory,
  subcategory2,
  subcategory3,
}) => {
  return (
    <div className="gap-1 flex-wrap text-xs 3xl:text-sm flex items-center text-[#4D4D4F]">
      <Link href="/" className="text-xs 3xl:text-sm flex items-center text-[#4D4D4F] leading-[150%]" >{root}</Link>
      <RxChevronRight className="ml-1"/>
      <div className="text-[#858585] text-xs 3xl:text-sm ml-1 leading-[150%]">{category}</div>
      {subCategory && (
        <>
          <RxChevronRight />
          {subCategory}
        </>
      )}
      {subcategory2 && (
        <>
          <RxChevronRight />
          {subcategory2}
        </>
      )}
      {subcategory3 && (
        <>
          <RxChevronRight />
          {subcategory3}
        </>
      )}
    </div>
  );
};

export default Breadcrumb;
