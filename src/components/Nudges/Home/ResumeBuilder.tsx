import Image from 'next/image'
import React from 'react'

export default function ResumeBuilder() {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:items-end bg-white rounded-lg py-8 2xl:py-11 px-9 2xl:px-10 !pb-0">
        <div className="block pb-8 xl:pb-10 2xl:pb-11">
            <h3 className="text-2xl xl:text-base 2xl:text-3xl font-medium">Need help with creating your resume? <br />
            Use our <span className="text-red font-bold font-kalam">resume builder</span> to make it easy!</h3>
            <button className="mt-3 md:mt-4 xl:!text-xs xl:!px-5">Start Building Your Resume</button>
        </div>
        <Image
            className="cursor-pointer resume-img mx-auto mb-3 sm:mb-0 w-auto h-[90px] xl:h-[100px] 2xl:h-[260px]"
            src={'/new-assets/nudges/resume-builder.png'}
            width={287}
            height={253}
            alt="resume-builder"
            /> 
    </div>
  )
}
