import Image from 'next/image'
import React from 'react'

export default function Interviewlaptop() {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:items-center bg-white rounded-lg py-8 2xl:py-11 px-9 2xl:px-14 !pb-0">
        <div className="block pb-8 xl:pb-10 2xl:pb-11 ">
            <h3 className="text-xl xl:text-lg 2xl:text-3xl font-medium xl:leading-5 2xl:leading-8">Practice <span className='text-red font-bold font-kalam'>mock interviews</span> and boost your confidence!</h3>
            <button className="mt-3 md:mt-4 xl:!text-xs xl:!px-5">Start Building Your Resume</button>
        </div>
        <Image
            className="cursor-pointer interview-img mx-auto mb-3 sm:mb-0 w-auto h-[90px] xl:h-[100px] 2xl:h-[150px]"
            src={'/new-assets/images/nudges/listing/interview-laptop.png'}
            width={287}
            height={253}
            alt="resume-builder"
            /> 
    </div>
  )
}
