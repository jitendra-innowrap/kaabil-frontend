import React from 'react'
import { jobcardtype } from './CompanyCard'
import Image from 'next/image'
import Link from 'next/link'
interface industryCard extends jobcardtype{
    color: string
}

export default function IndustryCard({icon, title, jobUrl, color}:industryCard) {
  return (
    <Link className="" href={jobUrl}>
    <div style={{background:`${color}`}} className={`w-full h-full flex flex-col justify-between bg-white rounded-2xl p-4 2xl:p-6 text-center`}>
        <div className="block">
            <Image
            className="size-[60px] 2xl:size-[90px] cursor-pointer mx-auto"
            src={icon}
            width={90}
            height={90}
            alt="company-icons"
            />
            <h3 className="font-medium p-4 text-black text-sm 2xl:text-xl mt-2 2xl:mt-6">{title}</h3>
        </div>
    </div>
    </Link>
  )
}
