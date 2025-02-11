import Image from 'next/image'
import React from 'react'
import { MdArrowOutward } from 'react-icons/md'
import { jobcardtype } from './CompanyCard'

export default function JobtypeCard({icon, title, jobUrl}:jobcardtype) {
  return (
    <div className="p-5 2xl:p-6 gap-4 flex rounded-2xl 2xl:rounded-3xl items-center justify-between bg-lightGrey">
        <div className="flex items-center">
        <Image
            className="size-[60px] 2xl:size-[90px] cursor-pointer mx-auto"
            src={'/new-assets/job-types/full-time.png'}
            width={90}
            height={90}
            alt="company-icons"
            />   
        <h3 className='ml-4 font-medium text-xl 2xl:text-2xl '>Full time</h3>  
        </div>  
        <div className="bg-white size-10 2xl:size-14 rounded-full grid place-items-center">
            <MdArrowOutward />
        </div>
    </div>
  )
}
