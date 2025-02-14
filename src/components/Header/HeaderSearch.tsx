'use client'
import React from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/redux/hooks';
import { setSearch } from '@/redux/searchSlice';

export default function HeaderSearch() {
    const dispatch = useDispatch();
    const isSearch = useAppSelector((state) => state.search.value);
    const handleSearch = () => {
        dispatch(setSearch(!isSearch));
    }
  return (
    <div>
        <div className="search-clicker cursor-pointer items-center justify-center gap-2 flex border border-[##A7A7A7]  relative w-fit rounded-lg py-1 px-2 xl:py-2 xl:px-3" onClick={handleSearch}>
            <HiMagnifyingGlass className='search-icon text-black size-5 xl:size-4 flex-shrink-0'/>
            <div className='search-label hidden xl:block whitespace-nowrap cursor-pointer text-[#000000] text-[10px] xl:text-xs'>Search Jobs, Company</div>
        </div>
    </div>
  )
}