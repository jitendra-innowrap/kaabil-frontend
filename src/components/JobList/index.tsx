'use client';
import Image from 'next/image';
import React, { Suspense, useEffect, useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import { HiOutlineCurrencyRupee, HiOutlineFilter } from 'react-icons/hi';
import { MdAccessTime } from 'react-icons/md';
import Pagination from '../Pagination';
import Link from 'next/link';
import { IoMdArrowDropdown } from 'react-icons/io';
import JobListingCard from '../Cards/JobListingCard';
import Interview from '../Nudges/Listing/Interview';
import RegisterInMinutes from '../Nudges/Listing/RegisterInMinutes';
import { api2 } from '@/Services/Apiservice';
import { useAppSelector } from '@/redux/hooks';
import { useSearchParams, useRouter } from 'next/navigation';
import { getSessionData } from '../utils/deviceId';
import { setJobFiltersMaster } from '@/redux/jobsFilterSlice';
import { useDispatch } from 'react-redux';

function JobList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get('page') || '1'; // Get the current page from the URL
  const search = searchParams.get('search') || ''; // Get the current page from the URL
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10));
  const [totalPages, setTotalPages] = useState(0);
  const maxPagesToShow = 5; // Maximum pages to display
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState<object[]>([]);

  const sort = searchParams.get('sort') || '1'; // Default to '1' (Relevance)

  // Handle sort option selection
  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort); // Update the sort parameter in the URL
    router.push(`?${params.toString()}`, { scroll: false }); // Update the URL without refreshing the page
  };
  // Fetch jobs based on the current page
  useEffect(() => {
    const fetchJobs = async () => {
      // Parse URL parameters
      const jobTypesFilter = searchParams.get('job_types_filter')?.split('|') || [];
      const locationFilter = searchParams.get('location_filter')?.split('|') || [];
      const experienceFilter = searchParams.get('experience')?.split('|') || [];
      const jobLocationTypesFilter = searchParams.get('job_location_types_filter')?.split('|') || [];
      const benefitsFilter = searchParams.get('benefits_filter')?.split('|') || [];
      const minSalary = searchParams.get('minSalary') || '';
      const maxSalary = searchParams.get('maxSalary') || '';
      const search = searchParams.get('search') || '';
      // Format location_filter as an array of objects
      const formattedLocationFilter = locationFilter.map((location) => ({
        location: location,
        latitude: 0, // Replace with actual latitude if available
        longitude: 0, // Replace with actual longitude if available
      }));
      // Construct payload
      let payload = {
        recommendate: false,
        soft_skill_filter: [],
        skill_filter: [],
        job_location_types_filter: jobLocationTypesFilter,
        location_filter: formattedLocationFilter,
        benefits_filter: benefitsFilter,
        job_types_filter: jobTypesFilter,
        experience_filter: experienceFilter,
        min_salary: minSalary ? Number(minSalary) : null,
        max_salary: maxSalary ? Number(maxSalary) : null,
        search: search,
        sort: sort,
      };

      const { deviceId, secret, salt } = getSessionData();
                  
      // Ensure session data is available
      if (!deviceId || !secret || !salt) {
        console.log("Session data not available, retrying...");
        setTimeout(fetchJobs, 1000); // Retry after 1 second
        return;
      }
      try {
        const response = await api2.post(
          `/api/job/list?page=${currentPage}&pageLength=5&userId=${user?.id || 0}`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setJobs(response.data?.data?.jobs as object[]);
        setTotalPages(response.data?.data?.total);
        console.clear();
        console.log(response.data?.data);
        let filterMasters = {
          benefits_filter: response.data?.data?.filters?.benefits_filter?.buckets,
          job_location_types_filter: response.data?.data?.filters?.job_location_types_filter?.buckets,
          job_types_filter: response.data?.data?.filters?.job_types_filter?.buckets,
          location_filter: response.data?.data?.filters?.location_filter?.buckets,
          skill_filter: response.data?.data?.filters?.skill_filter?.buckets,
          soft_skills_filter: response.data?.data?.filters?.soft_skills_filter?.buckets,
          salary: { 
            min: response.data?.data?.filters?.min_salary?.value,
            max: response.data?.data?.filters?.max_salary?.value 
          },
        }
        dispatch(setJobFiltersMaster(filterMasters))
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [page, user?.id, searchParams]);

  // Function to get the pagination group
  const getPaginationGroup = () => {
    let start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let end = Math.min(totalPages, start + maxPagesToShow - 1);

    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Handle pagination button click
  const handleActive = (page: number) => {
    setCurrentPage(page);
    router.push(`?page=${page}`); // Update the URL with the new page
  };

  return (
    <div style={{ width: '-webkit-fill-available' }}>
      <div className="flex justify-between mb-5 xl:mb-7 2xl:mb-10 3xl:mb-12">
        <div className="">
          <h2 className="font-medium text-lg xl:text-xl 3xl:text-2xl 3xl:leading-7 mb-1 xl:mb-2">
            IT and Technology jobs
          </h2>
          <p className="text-[#787878] text-sm 2xl:text-sm">670 jobs for you</p>
        </div>
        <div className="relative h-fit group sort-by-container">
          <button
            type="button"
            className="text-[#4D4D4F] px-3 !py-2 flex items-center !border-black btn-border"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {sort === '1' ? 'Relevance' : sort === '2' ? 'Salary' : 'Sort By'}
            <IoMdArrowDropdown className="flex-shrink-0 ml-1 xl:ml-5 text-[#000000] size-4 3xl:size-5" />
          </button>
          <div
            className="opacity-0 sort-by-items-container hidden group-hover:block group-hover:opacity-100 absolute right-0 z-10 origin-top-right top-full focus:outline-hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="sort-items-wrapper rounded-md bg-white ring-1 shadow-lg ring-black/5 mt-1">
              <div className="py-0 sort-items" role="none">
                <div
                  onClick={() => handleSortChange('1')}
                  className="sort-item block px-4 py-2 text-xs 2xl:text-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 outline-hidden"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-2"
                >
                  Relevance
                </div>
                <div
                  onClick={() => handleSortChange('2')}
                  className="sort-item block px-4 py-2 text-xs 2xl:text-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 outline-hidden"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-2"
                >
                  Salary
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:gap-6">
        <Interview />
        <RegisterInMinutes />
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
  );
}
export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <JobList />
        </Suspense>
    );
}