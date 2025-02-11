import Image from 'next/image'
import React from 'react'

export default function SuccessCard({name, role, image, video}:{name: string, role: string, image: string, video?: string}) {
  return (
    <div className="career-skill relative rounded-2xl 2xl:rounded-3xl">
            <Image
                className="w-full rounded-2xl h-auto"
                src={'/new-assets/success-slider/slide1.png'}
                width={313}
                height={514}
                alt="company-icons"
                />   
             <div className="p-3 2xl:p-5 absolute bottom-0 left-0"> 
                <h3 className='text-white font-medium md:text-xl xl:text-2xl'>Rekha Mehta <br />
                <span className='font-light text-[#E6E7E8] text-xs xl:text-sm leading-none'> Commis Chef</span></h3>
             </div>
        </div>
  )
}
