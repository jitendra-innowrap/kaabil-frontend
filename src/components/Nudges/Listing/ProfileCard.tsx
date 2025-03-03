import Image from 'next/image'
import React from 'react'

export default function ProfileCard() {
  return (
    <div className="bg-white rounded-2xl px-4 xl:px-6 py-5 xl:py-8">
        <div className="flex flex-col items-center">
            <Image
                className="cursor-pointer mx-auto size-[70px] 2xl:size-[102px] mb-2"
                src={'/new-assets/icons/avatar.svg'}
                width={287}
                height={253}
                alt="resume-builder"
                /> 
                <h3 className="text-sm text-center 2xl:text-base 3xl:text-lg font-semibold mb-[2px]">Shweta Malankar</h3>
                <p className='text-xs text-center 2xl:text-sm text-[#4D4D4F] mb-3'>Lead UI/UX Designer</p>
                <p className='text-xs text-center 2xl:text-sm font-medium'>Complete your profile</p>
                <div className="flex items-center gap-2 w-full">
                    <div className="w-full h-[6px] 2xl:h-2 rounded-lg bg-[#CCCCCC]">
                        <div className="w-[40%] rounded-lg h-full bg-red"></div>
                        </div> <span className='text-xs 2xl:text-sm'>40%</span>
                </div>
                <button className="mt-3 md:mt-4 w-fit !text-red btn-border !border-red !text-xs">Complete Your Profile Now</button>
            </div>
        </div>
  )
}
