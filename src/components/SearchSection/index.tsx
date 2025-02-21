'use client'
import { decryptiontest } from '@/Services/Encryption'
import React from 'react'
import { GrLocation } from 'react-icons/gr'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import Select from 'react-select'
import { getSessionData } from '../utils/deviceId'


export default function SearchSection() {
  const handleSearch = () => {
    const session = getSessionData();
    console.log(session)
  }
  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 mx-auto rounded-[20px] lg:shadow-default max-w-[1313px] lg:bg-white xl:h-[80px] 2xl:h-[100px] items-center">
          <input type="text" id='searchbar_input' placeholder="Job Title or Company" className="placeholder:truncate w-full col-span-12 md:col-span-6 placeholder:text-[#808080]  px-6 py-2 xl:px-8 xl:py-4" />
          <div className="relative w-full xl:w-[250px] rounded-[40px]">
            <Select
              // value={null}
              options={[{value: 1, label:'Mumbai'}, {value: 2, label: 'Banglore'}, {value: 3, label: 'delhi'}, {value: 4, label: 'Hyderabad'}]}
              placeholder="Select Location"
              className=''
              components={{
                  IndicatorSeparator: () => null, // Remove the separator
              }}
            />
            <GrLocation className='absolute left-[10px] top-[16px] size-5 text-[#808080]'/>
          </div>
          <Select
            // value={null}
            options={[{value: 1, label:'Full Time'}, {value: 2, label: 'Part Time'}, {value: 3, label: 'Contract'}]}
            placeholder="Select Industry"
            className='w-full xl:w-[250px] rounded-[40px]'
            components={{
                IndicatorSeparator: () => null, // Remove the separator
            }}
          />
          <button onClick={handleSearch} className="md:text-lg justify-center w-full lg:w-fit font-semibold px-6 flex xl:px-8 xl:h-[80px] 2xl:h-[100px] whitespace-nowrap bg-[#E41C3B] text-white"> <HiMagnifyingGlass className='size-7 mr-3'/> Search Jobs</button>
        </div>
  )
}
