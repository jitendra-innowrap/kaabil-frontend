import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CareerSkill({title, link, image, index}:{title: string, link: string, image: string, index: string}) {
  return (
    <div className={`career-skill-${index} skill-card bg-white relative rounded-2xl 2xl:rounded-3xl shadow-lg`}>
        <Image
            className="w-full rounded-2xl h-auto"
            src={image}
            width={1380}
            height={1374}
            alt="company-icons"
            quality={100}
            />   
         <div className="p-6 3xl:p-10 absolute bottom-0 left-0"> 
            <h3 className='text-white text-xl md:text-[22px] 3xl:text-[32px] 3xl:leading-[38px] mb-2 3xl:mb-5'>{title.split(" ").slice(0,-1).join(" ")}
            <span className='font-kalam font-semibold'> {title.split(" ").slice(-1)}</span></h3>
            <Link href={'#'} onClick={e => e.preventDefault()} className='btn text-xs px-3 2xl:px-[18px] py-2 2xl:py-[10px] 3xl:!text-base'>View Courses</Link>
         </div>
    </div>
  )
}
