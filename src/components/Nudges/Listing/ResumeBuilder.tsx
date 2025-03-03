import Image from 'next/image'
import React from 'react'

export default function ResumeBuilder() {
  return (
    <div className="flex relative bg-[#FEF5E4] rounded-lg p-5 2xl:p-6 3xl:p-7">
        <div className="block relative z-[1] pb-8 xl:pb-12 2xl:pb-[70px]">
            <h3 className="mb-2 xl:mb-3 max-w-[210px] 2xl:max-w-[320px] text-lg lg:text-lg lg:leading-[22px] 2xl:text-xl 2xl:leading-6 3xl:text-2xl 3xl:leading-[29px] font-medium">Need help with creating your resume?
            Use our <span className="font-bold font-kalam text-red">resume builder</span>  to make it easy! </h3>
            <button className="mt-2 lg:mt-3 text-xs">Start Building Your Resume</button>
        </div>
        <Image
            className="absolute bottom-0 right-4 z-0 mx-auto w-[150px] 3xl:w-[220px] h-auto"
            src={'/new-assets/nudges/resume-builder.png'}
            width={287}
            height={253}
            alt="resume-builder"
            /> 
    </div>
  )
}
