'use client'
import Image from 'next/image'
import React from 'react'
import Select from 'react-select'

export default function FindCareer() {
  return (
    <div className="bg-[#EFEFEF] rounded-2xl">
        <div className="p-5 md:p-6 2xl:p-7">
        <h3 className="mb-2 xl:mb-3 text-lg md:text-xl xl:text-2xl 2xl:text-[28px] 2xl:leading-[37px] font-medium">Not sure what <span className="font-bold font-kalam text-red">job</span> suits you? </h3>
        <p className="text-sm mb-4 md:mb-6">Find career paths that match your skills and strengths.</p>
        <p className="font-medium mb-4 md:mb-6">Answer a few simple questions and we’ll help you discover the right careers!</p>
        <form action="" className='flex flex-col items-end'>
            <Select
                // value={null}
                options={[{value: 1, label:'Primary'}, {value: 2, label: 'Seconday'}, {value: 3, label: 'Graduate'}, {value: 4, label: 'Masters'}]}
                placeholder="Select your education level"
                className='w-full'
                components={{
                    IndicatorSeparator: () => null, // Remove the separator
                }}
            />
            <button className='w-fit mt-2 md:mt-3'>
                next
            </button>
        </form>
        </div>
            <Image src="/new-assets/images/nudges/listing/find-career.png" alt="find-career" width="327" height="271" className='w-full h-auto'/>
        </div>
  )
}
