import Image from 'next/image'
import React from 'react'

export default function ProfileCard() {
  return (
    <div className="bg-white rounded-2xl px-4 xl:px-6 py-5 xl:py-8">
        <div className="flex flex-col items-center">
            <Image
                className="cursor-pointer mx-auto size-[70px] 2xl:size-[102px]"
                src={'/new-assets/images/nudges/listing/profile-card-avatar.png'}
                width={287}
                height={253}
                alt="resume-builder"
                /> 
                <h3 className="text-sm text-center md:text-base 2xl:text-lg font-semibold">Shweta Malankar</h3>
                <p className='text-xs text-center md:text-sm text-[#4D4D4F]'>Lead UI/UX Designer</p>
                <p className='text-xs text-center md:text-sm font-medium'>Complete your profile</p>
                <div className="flex items-center gap-2 w-full">
                    <div className="w-full h-2 rounded-lg bg-[#CCCCCC]">
                        <div className="w-[40%] rounded-lg h-full bg-red"></div>
                        </div> <span>40%</span>
                </div>
                <button className="mt-3 md:mt-4 w-fit !text-red btn-border !border-red !text-xs">Complete Your Profile Now</button>
            </div>
        </div>
  )
}
