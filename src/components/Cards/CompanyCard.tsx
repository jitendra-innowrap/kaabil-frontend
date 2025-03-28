'use client'
import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProfilePhoto from './ProfilePhoto';
export interface jobcardtype{icon:string, title:string, companyId?:string, jobUrl:string}
export default function CompanyCard({icon, title, companyId}:jobcardtype) {
  const {token} = useAppSelector((state) => state.auth);

  return (
    <div className="company-card shadow-sm rounded-2xl overflow-hidden">
      <div className="w-full flex flex-col justify-between bg-white p-3 lg:p-4 xl:p-3 2xl:p-[22px] text-center">
        <div className="block">
            <ProfilePhoto  index={1} logo={icon} styles="size-[50px] lg:size-[60px] rounded-md 2xl:rounded-lg border 2xl:size-[90px] cursor-pointer mx-auto img"  name={title} />
            <h3 className="font-medium text-xs h-[32px] lg:h-[50px] lg:text-sm lg:h-[40px] 2xl:text-lg 3xl:text-xl 3xl:h-[59px] my-3 xl:my-4 line-clamp-2" title={title}>{title}</h3>
        </div>
        <Link className="text-xs w-full 2xl:text-lg font-semibold justify-self-end" href={`/company/profile/${companyId}`}>
            View Jobs
        </Link>
    </div>
    </div>
  )
}
