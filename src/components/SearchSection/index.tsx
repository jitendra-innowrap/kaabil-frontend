'use client'
import { decryptiontest } from '@/Services/Encryption'
import React from 'react'
import { GrLocation } from 'react-icons/gr'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import Select from 'react-select'
import { getSessionData } from '../utils/deviceId'
import { notFound } from 'next/navigation'
import Image from 'next/image'


export default function SearchSection() {
  
  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 mx-auto rounded-xl 2xl:rounded-[20px] lg:shadow-default max-w-[1313px] lg:bg-white xl:h-[80px] 2xl:h-[100px] items-center">
          <input type="text" id='searchbar_input' placeholder="Job Title or Company" className="placeholder:truncate w-full text-xs 2xl:text-base 3xl:text-lg md:col-span-4 placeholder:text-[#231F20] opacity-60  px-6 py-2 xl:px-8 3xl:pl-[31px] xl:py-4" />
          <div className="relative w-full xl:w-[250px] 3xl:w-[345px] rounded-[40px]">
            <Select
              // value={null}
              options={[{value: 1, label:'Mumbai'}, {value: 2, label: 'Banglore'}, {value: 3, label: 'delhi'}, {value: 4, label: 'Hyderabad'}]}
              placeholder="Select Location"
              className='text-xs 2xl:text-base'
              classNamePrefix='select-location'
              components={{
                  IndicatorSeparator: () => null, 
                  DropdownIndicator: () => (<img className='mr-3 opacity-60 w-4 2xl:w-5 h-auto' src="/new-assets/icons/chevron-down.svg" alt="" />)
              }}
            />
            {/* <img src={'/new-assets/icons/map-pin-gray.png'} alt='Map pin' width={100} height={100} className='absolute left-[10px] top-[16px] size-5 xl:size-4 2xl:size-[19px]' /> */}
            <GrLocation className='absolute left-[18px] opacity-60 top-[16px] size-5 xl:size-4 2xl:size-5 text-[#808080]' />
          </div>
          <div className="relative w-full rounded-[40px] xl:w-[220px] 3xl:w-[295px]">
            <Select
              // value={null}
              options={[{value: 1, label:'Full Time'}, {value: 2, label: 'Part Time'}, {value: 3, label: 'Contract'}]}
              placeholder="Select Industry"
              className='text-xs 2xl:text-base'
              classNamePrefix='select-industry'
              components={{
                  IndicatorSeparator: () => null, 
                  DropdownIndicator: () => (<img className='mr-3 opacity-60 w-4 2xl:w-5 h-auto' src="/new-assets/icons/chevron-down.svg" alt="" />)
              }}
            />
          </div>
          <button  className="md:text-lg xl:text-xs 2xl:text-lg justify-center w-full lg:w-fit font-medium px-6 flex xl:px-8 2xl:h-[100px] 2xl:min-w-[222px] whitespace-nowrap bg-[#E41C3B] text-white"> 
            <Image className="mr-4" src="/new-assets/icons/search-icon.svg" width="24" height="24" alt="Search" />
            Search Jobs</button>
        </div>
  )
}
