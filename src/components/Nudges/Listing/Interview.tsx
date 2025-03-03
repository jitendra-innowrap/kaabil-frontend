import Image from 'next/image'
import React from 'react'

export default function Interview() {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3 bg-[#FEF5E4] justify-between rounded-2xl px-4 3xl:px-6 py-3 3xl:py-5">
        <div className="block sm:max-w-[400px]">
            <h3 className="text-lg leading-5 3xl:text-2xl font-medium">Give your next <span className="text-red font-bold font-kalam"> interview </span>with confidence!</h3>
            <p className='text-xs 3xl:text-base 3xl:leading-5'>Practice with mock interviews and get instant feedback.</p>
            <button className="mt-3 md:mt-4 text-xs 3xl:text-sm">Register to Start Mock Interview</button>
        </div>
        <Image
            className=" flex-shrink-0 cursor-pointer w-[150px] h-auto sm:w-auto sm:h-[100px] lg:h-[120px] 3xl:w-[257px] 3xl:h-auto"
            src={'/new-assets/images/nudges/listing/interview-laptop.png'}
            width={287}
            height={253}
            alt="resume-builder"
            /> 
    </div>
  )
}
