import Image from 'next/image'
import React from 'react'

export default function RegisterInMinutes() {
  return (
    <div className="flex bg-[#F9D1D7] justify-between rounded-2xl px-4 xl:px-6 py-3 xl:py-5">
            <div className="block">
                <h3 className="text-2xl 2xl:text-3xl font-medium">It only takes a minute to register</h3>
                <p>Start your career journey today!</p>
                <button className="mt-3 md:mt-4">Register to Apply jobs</button>
            </div>
            <Image
                className="cursor-pointer w-[100px] 2xl:w-[157px] h-auto"
                src={'/new-assets/images/nudges/listing/timer.png'}
                width={287}
                height={253}
                alt="resume-builder"
                /> 
        </div>
  )
}
