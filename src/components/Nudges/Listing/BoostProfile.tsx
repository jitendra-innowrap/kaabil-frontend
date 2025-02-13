import Image from 'next/image'
import React from 'react'

export default function BoostProfile() {
  return (
    <div className="flex bg-[#FFCCD4] justify-between rounded-2xl px-4 xl:px-6 py-3 xl:py-5">
        <div className="block">
            <h3 className="text-sm md:text-base 2xl:text-lg font-bold">Boost your profile! </h3>
            <p className=' text-xs md:text-sm'>Add your experience, Education to unlock better job opportunities</p>
            <button className="mt-3 md:mt-4 !text-white !bg-black !text-xs">Add</button>
        </div>
        <Image
            className="cursor-pointer w-[100px] 2xl:w-[157px] h-auto"
            src={'/new-assets/images/nudges/listing/profile-review.png'}
            width={287}
            height={253}
            alt="resume-builder"
            /> 
    </div>
  )
}
