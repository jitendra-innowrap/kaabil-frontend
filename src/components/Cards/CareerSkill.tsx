import Image from 'next/image'
import React from 'react'

export default function CareerSkill() {
  return (
    <div className="career-skill bg-white relative rounded-2xl shadow-secondary">
        <Image
            className="w-full rounded-2xl h-auto"
            src={'/new-assets/skills/21-century.png'}
            width={460}
            height={458}
            alt="company-icons"
            />   
         <div className="p-6 2xl:p-10 absolute bottom-0 left-0"> 
            <h3 className='text-white font-medium text-xl md:text-2xl 2xl:text-[32px] 2xl:leading-[38px] mb-2'>21st century <br />
            <span className='font-kalam'> skills</span></h3>
            <button className='font-medium text-xs px-3 2xl:px-[18px] py-2 2xl:py-[10px] 2xl:text-base'>View Courses</button>
         </div>
    </div>
  )
}
