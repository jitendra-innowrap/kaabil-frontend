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
    <div className='job-card h-full flex flex-col justify-between small w-full border shadow-sm border-lightGrey rounded-2xl bg-white p-4 3xl:p-6'>
      <div className="">
        <div className="flex gap-3 3xl:gap-4 justify-between">
          <div className="flex gap-[10px] 3xl:gap-4">
          <Image
            src={"/new-assets/images/job-listing-icon.png"}
            width={44}
            height={44}
            alt="company profile logo"
            className="rounded-full size-9 3xl:size-11"
            />
            <div className="">
              <h3 className='text-xs 3xl:text-sm text-[#070828]'>{"Lorem Ipsum"}</h3>
              <p className='text-[8px] mt-1 3xl:text-xs text-[#B9B9B9]'>{detail?.job_created_date}</p>
            </div>
          </div>
          <span tabIndex={0} onClick={handleSave}>
          {
            !isFavorited? (
              <IoIosHeartEmpty className={`text-[#717B9E] size-4 3xl:size-5 cursor-pointer`}/>
            ) : (
              <IoIosHeart className={`text-red size-4 3xl:size-5 cursor-pointer`}/>
            )
          }
          </span>
        </div>
        <h3 className='text-sm 3xl:text-base min-h-10 2xl:text-lg 3xl:min-h-14 font-medium my-[6px] 3xl:my-3 line-clamp-2'>{detail?.job_title}</h3>
        <div className="flex mb-1 md:mb-2">
          <img src={'/new-assets/icons/location-pin-dot.svg'} alt='Map pin' width={100} height={100} className='size-3 2xl:size-[19px]' />
          {/* <LiaMapMarkerAltSolid className='text-[#545581] size-3 2xl:size-5'/> */}
          <span className='ml-2 text-[10px] 2xl:text-sm text-[#545581]'>{detail?.job_location || "Kandivali, Mumbai"}</span>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex flex-1">
            <TbBriefcase2 className='text-[#545581] size-3 2xl:size-5'/>
            <span className='ml-2 text-[10px] 2xl:text-sm text-[#545581]'>{showExperience(detail?.min_exp, detail?.max_exp)}</span>
          </div>
          <div className='ml-5 text-[10px] flex-1 2xl:text-sm text-[#545581] text-end'>{showSalary(detail?.is_industry_standard, detail?.salary_range_unit, detail?.min_salary, detail?.max_salary)}</div>
        </div>
        <ul className='flex flex-wrap gap-2 mt-3'>
          {
            detail?.jobs_skills?.slice(0, parseInt(detail?.id))?.map((skill)=>(
              <li className='label small cursor-default' title={skill?.name}>{skill?.name}</li>
            ))
          }{
            detail?.jobs_skills?.length > 4 && (
              <li className='label small cursor-default'>+{(detail?.jobs_skills?.length - 4).toString()} More</li>
            )
          }
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 min-h-16 justify-between">
        <div className="flex action-btns gap-4 flex-wrap justify-end items-end">
        <Link href="/jobs/detail/2838" className='grid place-items-center btn-border whitespace-nowrap !p-0 h-[30px] 3xl:h-[44px] flex-1 text-[10px] 2xl:text-xs 3xl:text-sm text-red !border-red'>view Job</Link>
        <Link href="/jobs/detail/2838" className='grid place-items-center btn-border whitespace-nowrap !p-0 h-[30px] 3xl:h-[44px] flex-1 text-[10px] 2xl:text-xs 3xl:text-sm text-white !bg-red !border-red'>quick Apply</Link>
        </div>
      </div>
    </div>
  )
}
