import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
export interface jobcardtype{icon:string, title:string, jobUrl:string}
export default function CompanyCard({icon, title, jobUrl}:jobcardtype) {
  return (
    <div className="rounded-2xl shadow-default overflow-hidden">
      <div className="size-[200px] 2xl:size-[263px] flex flex-col justify-between bg-white p-4 2xl:p-6 text-center">
        <div className="block">
            <Image
            className="size-[60px] 2xl:size-[90px] cursor-pointer mx-auto"
            src={icon}
            width={90}
            height={90}
            alt="company-icons"
            />
            <h3 className="font-medium text-lg 2xl:text-xl mt-4 2xl:mt-6">{title}</h3>
        </div>
        <Link className="2xl:text-lg font-semibold justify-self-end" href={'/company/profile/swiggy'}>
            View Jobs
        </Link>
    </div>
    </div>
  )
}
