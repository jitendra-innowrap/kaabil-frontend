'use client'
import React, { useEffect, useRef, useState } from 'react'
import LoadMoreAccordian from './LoadMoreAccordian'
import { VscListFilter } from 'react-icons/vsc'
import { HiOutlineFilter } from 'react-icons/hi'
import RangeAccordian from './RangeAccordian'
import PopularTags from './PopularTags'
import { GrLocation } from 'react-icons/gr'
import { useAppSelector } from '@/redux/hooks'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { api2 } from '@/Services/Apiservice'
import { getSessionData } from '../utils/deviceId'
import path from 'path'
import { setJobFiltersMaster } from '@/redux/jobsFilterSlice'
import { useDispatch } from 'react-redux'

export default function FilterMobilePannel() {
    const [open, setOpen] = useState(false);
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const filters = useAppSelector((state) => state.jobFiltersMaster);
    const {id, isLoggedIn} = useAppSelector((state) => state.user)
    const dispatch = useDispatch();
    const router = useRouter();
    const [removeOptionsSearch, SetremoveOptionsSearch] = useState(false);
    // Handle Clear All button click
    const handleClearAll = () => {
        // Remove all search parameters and navigate to the base URL
        SetremoveOptionsSearch(!removeOptionsSearch)
        router.replace('/jobs', { scroll: false }); // Replace '/jobs' with your base route
    };
      const overlayRef = useRef<HTMLDivElement>(null);
    const filterButtonRef = useRef<HTMLDivElement>(null);

    const handleOverlayClick = (e: MouseEvent) => {
        // Check if click is outside the filter button and overlay
        if (
        overlayRef.current && 
        e.target === overlayRef.current &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(e.target as Node)
        ) {
        setOpen(false);
        }
    };

    useEffect(() => {
        if (open) {
        document.addEventListener('click', handleOverlayClick);
        document.body.style.overflow = 'hidden';
        } else {
        document.removeEventListener('click', handleOverlayClick);
        document.body.style.overflow = '';
        }

        return () => {
        document.removeEventListener('click', handleOverlayClick);
        document.body.style.overflow = '';
        };
    }, [open]);
    
    useEffect(() => {
    // Add or remove 'no-scroll' class to body when popup is open or closed
    if (open) {
        document.addEventListener("click", handleOverlayClick);
        document.body.classList.add("no-scroll");
    } else {
        document.removeEventListener("click", handleOverlayClick);
        document.body.classList.remove("no-scroll");
    }
    return () => {
        document.removeEventListener("click", handleOverlayClick);
        document.body.classList.remove("no-scroll");
    };
    }, [open]);

    const pathname = usePathname();

    const handleSearch = (e: any) => {
        e.preventDefault();
        
        // Blur the active input to dismiss mobile keyboard
        if (document.activeElement instanceof HTMLFormElement) {
            document.activeElement.blur();
        }
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if(pathname=='/jobs'){
            router.replace(`/jobs?${params.toString()}`);
        }else{
            router.push(`/jobs?${params.toString()}`);
        }
    };

     // Fetch jobs based on the current page
      useEffect(() => {    
        if(pathname=='/') fetchJobs();
      }, [searchParams.toString()]);
    
      const fetchJobs = async () => { 
        // Parse URL parameters
      const jobTypesFilter =
      searchParams.get("job_types_filter")?.split("|") || [];
      const locationFilter =
        searchParams.get("location_filter")?.split("|") || [];
      const industriesFilter =
        searchParams.get("industries_filter")?.split("|") || [];
      const experienceFilter = searchParams.get("experience")?.split("|") || [];
      const mappedExperienceFilter = experienceFilter.map((exp) => {
        if (exp === "Fresher") {
          return 1;
        } else {
          return 0;
        }
      });
      const jobLocationTypesFilter =
        searchParams.get("job_location_types_filter")?.split("|") || [];
      const benefitsFilter =
        searchParams.get("benefits_filter")?.split("|") || [];
      const minSalary = searchParams.get("minSalary") || "";
      const maxSalary = searchParams.get("maxSalary") || "";
      const latitude = searchParams.get("latitude")?.split("|") || []; // Parse latitude as an array
      const longitude = searchParams.get("longitude")?.split("|") || []; // Parse longitude as an array
      const company_id = searchParams.get("cmp_id")?.split("|") || []; // Parse longitude as an array
      const search = searchParams.get("search") || "";

      // Check if any filters are applied
      const hasFilters =
        jobTypesFilter.length > 0 ||
        locationFilter.length > 0 ||
        industriesFilter.length > 0 ||
        experienceFilter.length > 0 ||
        jobLocationTypesFilter.length > 0 ||
        benefitsFilter.length > 0 ||
        minSalary ||
        maxSalary ||
        company_id.length > 0 ||
        search;

      // Format location_filter as an array of objects with latitude and longitude
      const formattedLocationFilter = locationFilter.map((location, index) => {
        const locationObj: {
          location: string;
          latitude?: number;
          longitude?: number;
        } = {
          location: location,
        };

        // Add latitude only if it exists
        if (latitude[index]) {
          locationObj.latitude = parseFloat(latitude[index]);
        }

        // Add longitude only if it exists
        if (longitude[index]) {
          locationObj.longitude = parseFloat(longitude[index]);
        }

        return locationObj;
      });

      // Construct payload
      let payload = {
        recommendate: isLoggedIn ? !hasFilters : false, // Set recommendate to true if no filters are applied, else false
        company_id_filter: company_id,
        soft_skill_filter: [],
        skill_filter: [],
        job_location_types_filter: jobLocationTypesFilter,
        industries_filter: industriesFilter,
        location_filter: formattedLocationFilter, // Use formatted location filter
        benefits_filter: benefitsFilter,
        job_types_filter: jobTypesFilter,
        experience_filter: mappedExperienceFilter,
        min_salary: minSalary ? Number(minSalary) : null,
        max_salary: maxSalary ? Number(maxSalary) : null,
        search: search,
        sort: isLoggedIn? 1: 3,
    };
  
        const { deviceId, secret, salt } = getSessionData();
  
        // Ensure session data is available
        if (!deviceId || !secret || !salt) {
          // console.log("Session data not available, retrying...");
          setTimeout(fetchJobs, 1000); // Retry after 1 second
          return;
        }
  
        try {
          const response = await api2.post(
            `/api/job/list?page=1&pageLength=10&userId=${
              id || 0
            }`,
            payload,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.clear();
          let filterMasters = {
            benefits_filter:
              response.data?.data?.filters?.benefits_filter?.buckets,
            job_location_types_filter:
              response.data?.data?.filters?.job_location_types_filter?.buckets,
            job_types_filter:
              response.data?.data?.filters?.job_types_filter?.buckets,
            experience: response.data?.data?.filters?.experience_filter?.buckets,
            location_filter:
              response.data?.data?.filters?.location_filter?.buckets,
            industries_filter:
              response.data?.data?.filters?.industries_filter?.buckets,
            skill_filter: response.data?.data?.filters?.skill_filter?.buckets,
            soft_skills_filter:
              response.data?.data?.filters?.soft_skills_filter?.buckets,
            salary: {
              min: response.data?.data?.filters?.min_salary?.value,
              max: response.data?.data?.filters?.max_salary?.value,
            },
          };
          console.log('filter home data 🍃🍃🍃🍃', filterMasters)

          // @ts-ignore
          // if (!isfilterAvailable) 
          dispatch(setJobFiltersMaster(filterMasters));
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      };
      const handleclose=()=>{
        setOpen(false);
      }
  return (
      <>
      {/* <pre>{JSON.stringify(filters,null,2)}</pre> */}

    {open && 
    <div ref={overlayRef} id='filter-pannel-overlay' className={`block bg-black opacity-20 z-[103]  w-screen h-screen fixed top-0 left-0 `} onClick={()=>setOpen(false)}></div>}
    <div className="sticky top-[52px] h-fit">
        <form onSubmit={handleSearch} className="flex mobile-job-search relative lg:hidden justify-between items-center w-full mb-[22px]">
            <input
                type="text"
                id="searchbar_input"
                placeholder="Job Title or Company"
                value={search}
                onKeyDown={(e:any) => {
                  if (e.key === "Enter") {
                      e?.target?.blur();
                      handleSearch(e); 
                  }
              }}
                onChange={(e) => setSearch(e.target.value)}
                className="placeholder:truncate w-full text-sm leading-[100%] font-normal 2xl:text-base 3xl:text-lg md:col-span-4 placeholder:text-[#231F20] opacity-60 p-5 pl-[45px] rounded-xl lg:px-8 3xl:pl-[31px] lg:py-4"
            />
            <div onClick={()=>setOpen(!open)} ref={filterButtonRef} className='absolute size-[42px] top-[9px] right-[13px]' style={{textTransform:'unset'}}>
                <Image width={42} height={42} src={"/new-assets/icons/mobile-filter.svg"} alt='filter icon' />
            </div>
            <div className='absolute size-[18px] top-[21px] left-[19px]' style={{textTransform:'unset'}}>
                <Image width={18} height={18} src={"/new-assets/icons/mobile-filter-search.svg"} alt='search icon' />
            </div>
        </form>
    </div>
    <div className="filters-sidebar !static w-screen lg:min-w-[260px] 3xl:min-w-[320px] h-fit lg:p-6 rounded-[20px] flex bg-white flex-col lg:w-fit items-start">
        <div className="flex lg:gap-7 xl:gap-10 2xl:gap-12">
            <div className={`
            fixed lg:relative
            bottom-0 lg:bottom-auto
            left-0
            w-screen lg:w-full
            h-[80vh] max-h-[600px]
            bg-white
            rounded-t-3xl lg:rounded-3xl
            z-[105]
            transform
            transition-all duration-300
            ${!open ? 'translate-y-full lg:translate-y-0' : 'translate-y-0'}
            ${!open ? 'lg:hidden' : ''}
            flex flex-col gap-4 xl:gap-5 p-6 lg:p-0
            `}>
            <div className="flex lg:hidden justify-between items-center w-full mb-2 md:mb-4 xl:mb-6 2xl:mb-8">
                <h2 className="text-lg  2xl:text-xl font-medium filter-head">All Filters</h2>
                <div className="flex gap-4">
                <button onClick={handleClearAll} className='btn-border clear-all text-black !border-black text-xs font-medium max-w-[72px] !px-2 whitespace-nowrap text-center' style={{textTransform:'unset'}}>Clear all</button>
                <button onClick={handleclose} className='btn-border clear-all text-black !border-black text-xs font-medium max-w-[72px] !px-2 whitespace-nowrap text-center' style={{textTransform:'unset'}}>Close</button>
                </div>
            </div>
            <div className="overflow-y-auto h-[calc(100%_-_110px)] !pr-0">
                <LoadMoreAccordian 
                    showOptionsOnlyOnSearch
                    header="Search by Location"  
                    isSearchable={true} 
                    searchIcon={<GrLocation className='size-4 2xl:size-5 text-[#6C757D] font-bold' />}
                    list={filters?.location_filter} 
                    maxItems={10}
                    removeOptionsSearch={removeOptionsSearch}
                    filterKey='location_filter'
                    // fetchMoreItems={fetchLocationOptions}
                    searchPlaceholder='Choose city'
                    />
                <LoadMoreAccordian 
                    header="Industry"
                    maxItems={5}
                    list={filters?.industries_filter} 
                    filterKey='industries_filter'
                    />
                <LoadMoreAccordian 
                    header="Job Type"
                    list={filters?.job_types_filter} 
                    filterKey='job_types_filter'
                    />
                <LoadMoreAccordian 
                    header="Experience level" 
                    filterKey='experience'
                    list={filters?.experience} 
                    />

                <LoadMoreAccordian 
                    header="Work Mode"
                    filterKey='job_location_types_filter' 
                    list={filters?.job_location_types_filter} 
                    />

                <LoadMoreAccordian 
                    maxItems={8}
                    filterKey='benefits_filter'
                    // isSearchable
                    header="Benefits" 
                    list={filters?.benefits_filter} 
                    />

                <RangeAccordian/>
                {/* <PopularTags/> */}
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
