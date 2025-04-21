'use client'
import React from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/redux/hooks';
import { openSearch } from '@/redux/searchSlice';
import { usePathname } from 'next/navigation';

export default function HeaderSearch() {
    const dispatch = useDispatch();
    const pathname = usePathname(); // Use `usePathname` hook to get the current path
    const isSearch = useAppSelector((state) => state.search.value);
    const handleSearch = () => {
        dispatch(openSearch());
        if(typeof window !== 'undefined'){
          window.scrollTo({ top: 0, behavior: 'smooth' });
          }


    }
    if (pathname && (pathname.includes("/company/profile/") || pathname.includes("/articles") || pathname.includes("/jobs/detail/"))) {
      return (
        <div>
            <div className={`search-clicker ${isSearch?"open":""} cursor-pointer xl:-translate-x-14 items-center justify-center gap-2 flex border border-[##A7A7A7]  relative w-fit rounded-lg py-1 px-2 xl:py-2 xl:px-3`} onClick={handleSearch}>
                <HiMagnifyingGlass className='search-icon text-black size-5 xl:size-4 flex-shrink-0'/>
                <div className='search-label hidden md:block whitespace-nowrap cursor-pointer text-[#000000] text-[10px] xl:text-xs'>Search Jobs, Company</div>
            </div>
        </div>
      )
      
    }
    else{
      return(<></>)
    }
}