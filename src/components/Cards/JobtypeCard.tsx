import Image from 'next/image'
import React from 'react'
import { MdArrowOutward } from 'react-icons/md'
import { jobcardtype } from './CompanyCard'

export default function JobtypeCard({icon, title, jobUrl}:jobcardtype) {
  return (
    <div className="p-5 group cursor-pointer 3xl:max-h-[115px] xl:p-4 3xl:p-6 gap-4 flex rounded-2xl 2xl:rounded-3xl items-center justify-between bg-lightGrey">
        <div className="flex items-center">
        <Image
            className="size-[60px] 2xl:size-[76px] cursor-pointer mx-auto"
            src={icon}
            width={90}
            height={90}
            alt="company-icons"
            />   
        <h3 className='ml-[30px] font-medium text-lg 3xl:text-2xl '>{title}</h3>  
        </div>  
        <div className="bg-white group-hover:bg-black size-10 2xl:size-14 rounded-full grid place-items-center">
            <MdArrowOutward className='text-black group-hover:text-white size-3 lg:size-4 2xl:size-6' />
        </div>
    </div>
  )
}
