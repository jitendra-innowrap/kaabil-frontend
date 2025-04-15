import Image from 'next/image'
import React from 'react'
import { BiPlay } from 'react-icons/bi'

export default function SuccessCard({name, role, image, video}:{name: string, role: string, image: string, video?: string}) {
  return (
    <div className="relative rounded-2xl 2xl:rounded-3xl">
            <Image
                className="w-full rounded-2xl h-auto"
                src={image}
                width={939}
                height={1542}
                quality={100}
                alt="company-icons"
                />   
             <div className="p-3 2xl:p-5 absolute bottom-0 left-0"> 
                <h3 className='text-white font-normal text-sm md:text-base 2xl:text-2xl'>Rekha Mehta</h3>
                <p className='!font-thin text-[#E6E7E8] text-[10px] 2xl:text-sm leading-none'> Commis Chef</p>
             </div>
            {video && <div className="absolute cursor-pointer bottom-2 right-2 size-9 2xl:size-11 bg-white rounded-full grid place-items-center">
            <BiPlay className='translate-x-[1px]'/>
          </div>}
        </div>
  )
}
