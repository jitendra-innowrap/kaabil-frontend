import React from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { RxChevronRight } from 'react-icons/rx';

// Define the props interface with appropriate types
interface BreadcrumbProps {
  root: string;
  category: string;
  subCategory?: string; // Optional
  subcategory2?: string; // Optional
  subcategory3?: string; // Optional
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ root, category, subCategory, subcategory2, subcategory3 }) => {
  return (
    <div className='gap-1 flex-wrap flex items-center text-[#4d4d4f]'>
      {root}
      <RxChevronRight />
      {category}
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