'use client'
import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function QuickAction() {
  const router = useRouter();
  const {skills, user_willing_to_relocate} = useAppSelector((state) => state.user);

  const handleClick=()=>{
    router.push('/my-profile')
  }
  return (
    <div className='rounded-2xl px-4 xl:px-6 py-3 xl:py-5 bg-white flex flex-col gap-3 2xl:gap-4'>
      <div className="">
        <div className="flex justify-between gap-2">
          <h3 className='font-medium text-sm 2xl:text-base'>Add More Skills to Find Better Job Matches!</h3>
          <div className="flex items-center h-fit cursor-pointer" onClick={handleClick}>
            <Image src={'/new-assets/icons/pencil.png'} alt='edit-pencil' aria-label='edit icon' className='w-3 h-3 mr-1' width={90} height={90}/>
            <span className='text-red text-sm font-semibold'>Edit</span>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap md:gap-4 mt-2 2xl:mt-[10px]">
          {
            skills?.slice(0, 3)?.map((skill)=>(
          <div className="label text-[10px] 2xl:text-xs">
            {skill?.name}
          </div>
            ))
          }
          {(skills?.length ?? 0) > 3 && (
            <div className="label text-[10px] 2xl:text-xs">
              +{((skills?.length ?? 0) - 3).toString()} More
            </div>
          )}
        </div>
      </div>
      <div className="">
        <div className="flex justify-between gap-2">
          <h3 className='font-medium text-sm 2xl:text-base'>Your Preferred job location</h3>
          <div className="flex items-center h-fit cursor-pointer" onClick={handleClick}>
            <Image src={'/new-assets/icons/pencil.png'} alt='edit-pencil' aria-label='edit icon' className='w-3 h-3 mr-1' width={90} height={90}/>
            <span className='text-red text-sm font-semibold'>Edit</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 md:gap-4 mt-2 2xl:mt-[10px]">
          {
            user_willing_to_relocate?.slice(0, 3)?.map((location)=>(
          <div className="label text-[10px] 2xl:text-xs">
            {location}
          </div>
            ))
          }
          {(user_willing_to_relocate?.length ?? 0) > 3 && (
            <div className="label text-[10px] 2xl:text-xs">
              +{((user_willing_to_relocate?.length ?? 0) - 3).toString()} More
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
