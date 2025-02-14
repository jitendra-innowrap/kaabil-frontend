import Image from 'next/image'
import React from 'react'

export default function ResumeBuilder() {
  return (
    <div className="flex flex-col-reverse sm:flex-row bg-white rounded-lg py-8 xl:py-10 2xl:py-11 px-9 xl:px-12 2xl:px-14 !pb-0">
        <div className="block pb-8 xl:pb-10 2xl:pb-11">
            <h3 className="text-2xl 2xl:text-3xl font-medium">Need help with creating your resume? 
            Use our <span className="text-red font-kalam">resume builder</span> to make it easy!</h3>
            <button className="mt-3 md:mt-4">Start Building Your Resume</button>
        </div>
        <Image
            className="cursor-pointer mx-auto w-[150px] 2xl:w-[287px] h-auto"
            src={'/new-assets/nudges/resume-builder.png'}
            width={287}
            height={253}
            alt="resume-builder"
            /> 
    </div>
  )
}
