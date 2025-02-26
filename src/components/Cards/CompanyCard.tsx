import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
export interface jobcardtype{icon:string, title:string, jobUrl:string}
export default function CompanyCard({icon, title, jobUrl}:jobcardtype) {
  return (
    <div className="company-card shadow-sm rounded-2xl overflow-hidden">
      <div className="w-full flex flex-col justify-between bg-white p-4 xl:p-3 2xl:p-[22px] text-center">
        <div className="block">
            <Image
            className="size-[60px] 2xl:size-[90px] cursor-pointer mx-auto"
            src={icon}
            width={90}
            height={90}
            alt="company-icons"
            />
            <h3 className="font-medium text-xs h-[50px] 2xl:text-base 2xl:h-[79px] mt-3 2xl:mt-4 line-clamp-3" title={title}>{title}</h3>
        </div>
        <Link className="text-xs 2xl:text-lg font-semibold justify-self-end" href={'/company/profile/1506'}>
            View Jobs
        </Link>
    </div>
    </div>
  )
}
