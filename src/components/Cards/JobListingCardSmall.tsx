'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { BsHeartFill } from 'react-icons/bs'
import { CiHeart } from 'react-icons/ci'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { LiaMapMarkerAltSolid } from 'react-icons/lia'
import { MdOutlineLocationOn } from 'react-icons/md'
import { TbBriefcase2 } from 'react-icons/tb'
import { showExperience, showSalary } from '../utils'

export default function JobListingCardSmall({detail}:{detail:CompanyJob}) {
  const [isFavorited, setIsFavorited] = React.useState(detail?.saveJob_status=='2')
  const handleSave = () => {
    setIsFavorited(!isFavorited)
  }
  useEffect(() => {
    setIsFavorited(detail?.saveJob_status=='1')
  }, [detail])
  
  return (
    <div className='job-card w-full border shadow-default border-lightGrey rounded-2xl bg-white p-4 md:p-5 xl:p-6'>
      <div className="flex gap-3 md:gap-4 justify-between">
        <div className="flex gap-3 md:gap-4">
        <Image
          src={"/new-assets/images/job-listing-icon.png"}
          width={44}
          height={44}
          alt="company profile logo"
          className="rounded-full size-9 xl:size-10 2xl:size-11"
          />
          <div className="">
            <h3 className='text-sm text-[#070828]'>{"Lorem Ipsum"}</h3>
            <p className='text-xs text-[#B9B9B9]'>{detail?.job_created_date}</p>
          </div>
        </div>
        <span tabIndex={0} onClick={handleSave}>
        {
          !isFavorited? (
            <IoIosHeartEmpty className={`text-[#717B9E] size-5 cursor-pointer`}/>
          ) : (
            <IoIosHeart className={`text-red size-5 cursor-pointer`}/>
          )
        }
        </span>
      </div>
      <h3 className='text-base min-h-12 2xl:text-lg 2xl:min-h-14 font-medium my-2 md:my-3 line-clamp-2'>{detail?.job_title}</h3>
      <div className="flex mb-1 md:mb-2">
        <LiaMapMarkerAltSolid className='text-[#545581] size-3 2xl:size-5'/>
        <span className='ml-2 text-xs 2xl:text-sm text-[#545581]'>{detail?.job_location || "Kandivali, Mumbai"}</span>
      </div>
      <div className="flex justify-between gap-y-2">
        <div className="flex">
          <TbBriefcase2 className='text-[#545581] size-3 2xl:size-5'/>
          <span className='ml-2 text-xs 2xl:text-sm text-[#545581] whitespace-nowrap'>{showExperience(detail?.min_exp, detail?.max_exp)}</span>
        </div>
        <div className='ml-5 text-xs 2xl:text-sm text-[#545581] text-end'>{showSalary(detail?.is_industry_standard, detail?.salary_range_unit, detail?.min_salary, detail?.max_salary)}</div>
      </div>
      <div className="flex flex-wrap gap-4 min-h-16 justify-between">
        <ul className='flex flex-wrap gap-2 mt-3'>
          {
            detail?.jobs_skills?.slice(0, 4)?.map((skill)=>(
              <li className='label !text-xs 2xl:!text-sm'>{skill?.name}</li>
            ))
          }{
            detail?.jobs_skills?.length > 4 && (
              <li className='label !text-xs 2xl:!text-sm'>+{(detail?.jobs_skills?.length - 4).toString()}</li>
            )
          }
        </ul>
        <div className="flex action-btns gap-4 flex-wrap justify-end items-end">
        <Link href="/jobs/detail/2838" className='grid place-items-center btn-border whitespace-nowrap !px-0 h-[44px] flex-1 text-xs xl:text-sm text-red !border-red'>view Job</Link>
        <Link href="/jobs/detail/2838" className='grid place-items-center btn-border whitespace-nowrap !px-0 h-[44px] flex-1 text-xs xl:text-sm text-white !bg-red !border-red'>quick Apply</Link>
        </div>
      </div>
    </div>
  )
}
