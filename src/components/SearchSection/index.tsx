'use client'
import { decryptiontest } from '@/Services/Encryption'
import React from 'react'
import { GrLocation } from 'react-icons/gr'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import Select from 'react-select'
import { getSessionData } from '../utils/deviceId'
import { notFound } from 'next/navigation'


export default function SearchSection() {
  
  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 mx-auto rounded-xl 2xl:rounded-[20px] lg:shadow-default max-w-[1313px] lg:bg-white xl:h-[60px] 2xl:h-[100px] items-center">
          <input type="text" id='searchbar_input' placeholder="Job Title or Company" className="placeholder:truncate w-full text-xs 2xl:text-base col-span-12 md:col-span-4 placeholder:text-[#808080]  px-6 py-2 xl:px-8 xl:py-4" />
          <div className="relative w-full rounded-[40px]">
            <Select
              // value={null}
              options={[{value: 1, label:'Mumbai'}, {value: 2, label: 'Banglore'}, {value: 3, label: 'delhi'}, {value: 4, label: 'Hyderabad'}]}
              placeholder="Select Location"
              className='text-xs 2xl:text-base'
              components={{
                  IndicatorSeparator: () => null, // Remove the separator
              }}
            />
            <GrLocation className='absolute left-[10px] top-[16px] size-5 xl:size-4 2xl:size-5 text-[#808080]'/>
          </div>
          <div className="relative w-full rounded-[40px]">
            <Select
              // value={null}
              options={[{value: 1, label:'Full Time'}, {value: 2, label: 'Part Time'}, {value: 3, label: 'Contract'}]}
              placeholder="Select Industry"
              className='text-xs 2xl:text-base'
              components={{
                  IndicatorSeparator: () => null, // Remove the separator
              }}
            />
          </div>
          <button  className="md:text-lg xl:text-xs 2xl:text-lg justify-center w-full lg:w-fit font-semibold px-6 flex xl:px-8 2xl:h-[100px] whitespace-nowrap bg-[#E41C3B] text-white"> <HiMagnifyingGlass className='size-5 2xl:size-7 mr-3'/> Search Jobs</button>
        </div>
  )
}
