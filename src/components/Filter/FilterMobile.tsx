'use client'
import React, { useEffect, useRef, useState } from 'react'
import LoadMoreAccordian from './LoadMoreAccordian'
import { VscListFilter } from 'react-icons/vsc'
import { HiOutlineFilter } from 'react-icons/hi'
import RangeAccordian from './RangeAccordian'
import PopularTags from './PopularTags'
import { GrLocation } from 'react-icons/gr'
import { useAppSelector } from '@/redux/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

export default function FilterMobilePannel() {
    const [open, setOpen] = useState(false);
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const filters = useAppSelector((state) => state.jobFiltersMaster);
    // const [autocompleteService, setAutocompleteService] = useState<any>(null); // State for Google Places AutocompleteService

    // Load Google Places API script and initialize AutocompleteService
    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCp-H598wbMhBWMz9I_zbvdcknH-fiBVCo&libraries=places`;
    //     script.async = true;
    //     script.onload = () => {
    //         if (window.google && window.google.maps && window.google.maps.places) {
    //             setAutocompleteService(new window.google.maps.places.AutocompleteService());
    //         }
    //     };
    //     document.body.appendChild(script);

    //     return () => {
    //         document.body.removeChild(script);
    //     };
    // }, []);
    
    const router = useRouter();
    const [removeOptionsSearch, SetremoveOptionsSearch] = useState(false);
    // Handle Clear All button click
    const handleClearAll = () => {
        // Remove all search parameters and navigate to the base URL
        SetremoveOptionsSearch(!removeOptionsSearch)
        router.push('/jobs', { scroll: false }); // Replace '/jobs' with your base route
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
  return (
      <>
      {/* <pre>{JSON.stringify(filters,null,2)}</pre> */}

    {open && 
    <div ref={overlayRef} id='filter-pannel-overlay' className={`block bg-black opacity-20 z-[103]  w-screen h-screen fixed top-0 left-0 `} onClick={()=>setOpen(false)}></div>}
    <div className="sticky top-[52px] h-fit">
        <div className="flex mobile-job-search relative lg:hidden justify-between items-center w-full mb-[22px]">
            <input
                type="text"
                id="searchbar_input"
                placeholder="Job Title or Company"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="placeholder:truncate w-full text-sm leading-[100%] font-normal 2xl:text-base 3xl:text-lg md:col-span-4 placeholder:text-[#231F20] opacity-60 p-5 pl-[45px] rounded-xl lg:px-8 3xl:pl-[31px] lg:py-4"
            />
            <div onClick={()=>setOpen(!open)} ref={filterButtonRef} className='absolute size-[42px] top-[9px] right-[13px]' style={{textTransform:'unset'}}>
                <Image width={42} height={42} src={"/new-assets/icons/mobile-filter.svg"} alt='filter icon' />
            </div>
            <div className='absolute size-[18px] top-[21px] left-[19px]' style={{textTransform:'unset'}}>
                <Image width={18} height={18} src={"/new-assets/icons/mobile-filter-search.svg"} alt='search icon' />
            </div>
        </div>
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
            overflow-auto
            z-[105]
            transform
            transition-all duration-300
            ${!open ? 'translate-y-full lg:translate-y-0' : 'translate-y-0'}
            ${!open ? 'lg:hidden' : ''}
            flex flex-col gap-4 xl:gap-5 p-6 lg:p-0
            `}>
            <div className="flex lg:hidden justify-between items-center w-full mb-2 md:mb-4 xl:mb-6 2xl:mb-8">
                <h2 className="text-lg  2xl:text-xl font-medium filter-head">All Filters</h2>
                <button onClick={handleClearAll} className='btn-border clear-all text-black !border-black text-xs font-medium max-w-[72px] !px-2 whitespace-nowrap text-center' style={{textTransform:'unset'}}>Clear all</button>
            </div>
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
    </>
  )
}
