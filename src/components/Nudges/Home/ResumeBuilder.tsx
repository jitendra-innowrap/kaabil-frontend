import Image from 'next/image'
import React from 'react'

export default function ResumeBuilder() {
  return (
    <div className="nudge-card resume flex flex-col-reverse sm:flex-row sm:items-end bg-white rounded-lg px-5 py-8 2xl:py-11 lg:px-9 2xl:px-10 !pb-0">
        <div className="nudge-text block pb-8 xl:pb-10 2xl:pb-11">
            <h3 className="text-xl xl:text-lg 2xl:text-3xl font-medium xl:leading-5 2xl:leading-8">Need help with creating your resume? <br />
            Use our <span className="text-red font-bold font-kalam">resume builder</span> to make it easy!</h3>
            <button className="mt-3 text-[12px] px-4 md:mt-4 xl:!text-xs xl:!px-5">Start Building Your Resume</button>
        </div>
        <Image
            className="cursor-pointer resume-img mx-auto mb-3 sm:mb-0 w-auto lg:w-[170px] lg:h-auto xl:w-auto"
            src={'/new-assets/nudges/resume-builder.png'}
            width={287}
            height={253}
            alt="resume-builder"
            /> 
    </div>
  )
}
