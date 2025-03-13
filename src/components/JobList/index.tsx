'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FiCamera } from 'react-icons/fi'
import { HiOutlineCurrencyRupee, HiOutlineFilter } from 'react-icons/hi'
import { MdAccessTime } from 'react-icons/md'
import Pagination from '../Pagination'
import Link from 'next/link'
import { IoMdArrowDropdown } from 'react-icons/io'
import JobListingCard from '../Cards/JobListingCard'
import Interview from '../Nudges/Listing/Interview'
import RegisterInMinutes from '../Nudges/Listing/RegisterInMinutes'
import { api2 } from '@/Services/Apiservice'

export default function JobList() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10; // Total number of pages
    const maxPagesToShow = 5; // Maximum pages to display
    const [jobs, setJobs] = useState<object[]>([]);
      // Fetch job types from API
      useEffect(() => {
        const fetchJobs = async () => {
          let payload = {
            "recommendate": false,
            "soft_skill_filter": [],
            "skill_filter": [],
            "job_location_types_filter": [],
            "location_filter": [],
            "benefits_filter": [],
            "job_types_filter": [],
            "search": "",
            "sort": 1
        }  
    
          const formData = new FormData();
          // ✅ Automatically append all fields from the object
          Object.entries(payload).forEach(([key, value]) => {
            if(typeof value !== 'string'){
              let valueAsString = JSON.stringify(value);
              formData.append(key, valueAsString ); // Convert all values to strings
            }
          });
          try {
            const response = await api2.post('/api/job/list', payload, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            setJobs(response.data?.data?.jobs as object[]);
            console.clear();
            console.log(response.data?.data?.jobs[0]);
          } catch (error) {
            console.error('Error fetching job types:', error);
          }
        };
    
        fetchJobs();
      }, []);

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

    const [sort, setSort] = useState(0);
  return (
    <div style={{width:"-webkit-fill-available"}}>
            <div className="flex justify-between mb-5 xl:mb-7 2xl:mb-10 3xl:mb-12">
              <div className="">
                <h2 className='font-medium text-lg xl:text-xl 3xl:text-2xl 3xl:leading-7 mb-1 xl:mb-2'>IT and Technology jobs</h2>
                <p className='text-[#787878] text-sm 2xl:text-sm'>670 jobs for you</p>
              </div>
              <div className="relative h-fit group sort-by-container">
                <button type="button" className="text-[#4D4D4F] px-3 !py-2 flex items-center !border-black btn-border" id="menu-button" aria-expanded="true" aria-haspopup="true">
                  {(sort===1?"Relevance":sort===2?"Salary":"Sort By")}  
                  <IoMdArrowDropdown className='flex-shrink-0 ml-1 xl:ml-5 text-[#000000] size-4 3xl:size-5'/>
                </button>
                <div className="opacity-0 sort-by-items-container hidden group-hover:block group-hover:opacity-100 absolute right-0 z-10 origin-top-right top-full focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                    <div className="sort-items-wrapper rounded-md bg-white ring-1 shadow-lg ring-black/5 mt-1">
                        <div className="py-0 sort-items" role="none">
                          <div onClick={()=>{setSort(1)}} className="sort-item block px-4 py-2 text-xs 2xl:text-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 outline-hidden" role="menuitem" tabIndex={-1} id="menu-item-2">Relevance</div>
                          <div onClick={()=>{setSort(2)}} className="sort-item block px-4 py-2 text-xs 2xl:text-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 outline-hidden" role="menuitem" tabIndex={-1} id="menu-item-2">Salary</div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
              <Interview/>
              <RegisterInMinutes/>
            {jobs.map((job, index) => (
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
