'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { FiCamera } from 'react-icons/fi'
import { HiOutlineCurrencyRupee, HiOutlineFilter } from 'react-icons/hi'
import { MdAccessTime } from 'react-icons/md'
import Pagination from '../Pagination'
import Link from 'next/link'
import { IoMdArrowDropdown } from 'react-icons/io'
import JobListingCard from '../Cards/JobListingCard'
import Interview from '../Nudges/Listing/Interview'
import RegisterInMinutes from '../Nudges/Listing/RegisterInMinutes'

const successList = [
            {name: "", role:"", image:"", video:""},
            {name: "", role:"", image:"", video:""},
            {name: "", role:"", image:"", video:""},
            {name: "", role:"", image:"", video:""},
            {name: "", role:"", image:"", video:""},
            {name: "", role:"", image:"", video:""},
            {name: "", role:"", image:"", video:""},
            {name: "", role:"", image:"", video:""},
        ]
export default function JobList() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10; // Total number of pages
    const maxPagesToShow = 5; // Maximum pages to display

    // Function to get the pagination group
    const getPaginationGroup = () => {
        let start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let end = Math.min(totalPages, start + maxPagesToShow - 1);

        if (end - start < maxPagesToShow - 1) {
            start = Math.max(1, end - maxPagesToShow + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const handleActive = (page:any) => {
        setCurrentPage(page);
    };

  return (
    <div style={{width:"-webkit-fill-available"}}>
            <div className="flex justify-between mb-5 xl:mb-12">
              <div className="">
                <h2 className='font-medium text-lg md:text-xl xl:text-2xl mb-1 md:mb-2'>IT and Technology jobs</h2>
                <p className='text-[#787878]'>670 jobs for you</p>
              </div>
              <div className="relative h-fit max-h-[40px] text-left group">
                <button type="button" className="text-[#4D4D4F] px-3 !py-2 flex items-center !border-black btn-border" id="menu-button" aria-expanded="true" aria-haspopup="true">
                  Sort By  <IoMdArrowDropdown className='ml-1 xl:ml-5 text-[#000000] size-5'/>
                </button>
                <div className="opacity-0 hidden group-hover:block group-hover:opacity-100 absolute right-0 z-10 w-56 origin-top-right top-full focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                    <div className="rounded-md bg-white ring-1 shadow-lg ring-black/5 mt-1">
                        <div className="py-0" role="none">
                        <div className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 outline-hidden" role="menuitem" tabIndex={-1} id="menu-item-2">Relevance</div>
                        <div className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 outline-hidden" role="menuitem" tabIndex={-1} id="menu-item-2">Salary</div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
              <Interview/>
              <RegisterInMinutes/>
            {successList.map((job, index) => (
              <div className="flex w-[100%]" key={index}>
                <JobListingCard key={index} {...job} />
              </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 md:mt-14 2xl:mt-16">
                <Pagination
                    currentPage={currentPage}
                    handleActive={handleActive}
                    getPaginationGroup={getPaginationGroup()}
                    pages={totalPages}
                />
            </div>
          </div>
  )
}
