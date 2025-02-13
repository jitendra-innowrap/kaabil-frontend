'use client'
import Image from 'next/image'
import React from 'react'
import { CiHeart } from 'react-icons/ci'
import { LiaMapMarkerAltSolid } from 'react-icons/lia'
import { MdOutlineLocationOn } from 'react-icons/md'
import { TbBriefcase2 } from 'react-icons/tb'

export default function JobListingCard() {
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
            <h3 className='text-sm text-[#070828]'>Kotak Mahindra</h3>
            <p className='text-xs text-[#B9B9B9]'>1 month ago</p>
          </div>
        </div>
        <CiHeart className='text-[#717B9E] size-5'/>
      </div>
      <h3 className='xl:text-lg font-medium my-2 md:my-3'>WBG Operations (Ops)-Customer Service Desk</h3>
      <div className="flex mb-1 md:mb-2">
        <LiaMapMarkerAltSolid className='text-[#545581] size-5'/>
        <span className='ml-2 text-sm text-[#545581]'>Kandivali, Mumbai</span>
      </div>
      <div className="flex">
        <TbBriefcase2 className='text-[#545581] size-5'/>
        <span className='ml-2 text-sm text-[#545581]'>Kandivali, Mumbai</span>
        <span className='ml-5 text-sm text-[#545581]'>₹ 25k - 40k / <small className='text-[#B1B4B7]'>month</small></span>
      </div>
      <div className="flex flex-wrap gap-4 min-h-16 justify-between">
        <ul className='flex flex-wrap gap-2 mt-3'>
          <li className='label'>Problem Solving</li>
          <li className='label'>time management</li>
          <li className='label'>adaptability</li>
        </ul>
        <div className="flex action-btns gap-4 flex-wrap justify-end items-end">
          <button className='btn-border whitespace-nowrap h-fit px-1 w-[137px] text-red !border-red'>view Jobs</button>
          <button className='h-fit px-1 w-[137px]'>quick jobs</button>
        </div>
      </div>
    </div>
  )
}
