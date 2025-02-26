import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CareerSkill({title, link, image, index}:{title: string, link: string, image: string, index: string}) {
  return (
    <div className={`career-skill-${index} skill-card bg-white relative rounded-2xl 2xl:rounded-3xl shadow-lg`}>
        <Image
            className="w-full rounded-2xl h-auto"
            src={image}
            width={460}
            height={458}
            alt="company-icons"
            />   
         <div className="p-6 2xl:p-10 absolute bottom-0 left-0"> 
            <h3 className='text-white font-medium text-xl md:text-2xl 2xl:text-[32px] 2xl:leading-[38px] mb-2 2xl:mb-5'>{title.split(" ").slice(0,-1).join(" ")}
            <span className='font-kalam'> {title.split(" ").slice(-1)}</span></h3>
            <Link href={link} className='font-medium btn text-xs px-3 2xl:px-[18px] py-2 2xl:py-[10px] 2xl:text-base'>View Courses</Link>
         </div>
    </div>
  )
}
