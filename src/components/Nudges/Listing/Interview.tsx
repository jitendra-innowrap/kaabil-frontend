import Image from 'next/image'
import React from 'react'

export default function Interview() {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3 bg-[#FEF5E4] justify-between rounded-2xl px-4 xl:px-6 py-3 xl:py-5">
        <div className="block sm:max-w-[400px]">
            <h3 className="text-2xl 2xl:text-3xl font-medium">Give your next <span className="text-red font-kalam"> interview </span>with confidence!</h3>
            <p>Practice with mock interviews and get instant feedback.</p>
            <button className="mt-3 md:mt-4">Register to Start Mock Interview</button>
        </div>
        <Image
            className=" flex-shrink-0 cursor-pointer w-[150px] h-auto sm:w-auto sm:h-[100px] 2xl:w-[257px] 2xl:h-auto"
            src={'/new-assets/images/nudges/listing/interview-laptop.png'}
            width={287}
            height={253}
            alt="resume-builder"
            /> 
    </div>
  )
}
