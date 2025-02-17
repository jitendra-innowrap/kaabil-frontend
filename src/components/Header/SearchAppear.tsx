'use client'
import React from 'react'
import SearchSection from '../SearchSection'
import { useAppSelector } from '@/redux/hooks';

export default function SearchAppear(){
    const isSearch = useAppSelector((state) => state.search.value);
    return(
    <div  className={`${isSearch?"open":""} search-appear-animate`}>
        <div className="container seach-section px-5 py-4 md:px-14 md:py-6 xl:px-24 2xl:px-20">
            <SearchSection />
        </div>
    </div>
    )
}