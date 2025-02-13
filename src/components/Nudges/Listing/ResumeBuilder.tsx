import Image from 'next/image'
import React from 'react'

export default function ResumeBuilder() {
  return (
    <div className="flex relative bg-[#FEF5E4] rounded-lg p-5 md:p-6 2xl:p-7">
        <div className="block relative z-[1] pb-8 xl:pb-10 2xl:pb-11">
            <h3 className="mb-2 xl:mb-3 text-lg md:text-lg xl:text-xl 2xl:text-2xl 2xl:leading-[37px] font-medium">Need help with creating your resume?
            Use our <span className="font-bold font-kalam text-red">resume builder</span>  to make it easy! </h3>
            <button className="mt-2 md:mt-3 text-xs">Start Building Your Resume</button>
        </div>
        <Image
            className="absolute bottom-0 right-4 z-0 mx-auto w-[150px] 2xl:w-[220px] h-auto"
            src={'/new-assets/nudges/resume-builder.png'}
            width={287}
            height={253}
            alt="resume-builder"
            /> 
    </div>
  )
}
