import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ArticleCard() {
  return (
    <div className='!P-[5px] rounded-xl shadow-lg bg-white'>
        <div className="block p-[5px]">
        <Image
        src={'/new-assets/images/article1.png'}
        width={447}
        height={273}
        className='mx-auto'
        alt="company-icons"
        quality={100}
        />
        </div>   
        <div className="block p-3 md:p-4 2xl:p-5">
            <h3 className='font-medium text-[16px] md:text-base 2xl:text-2xl mb-2 lg:mb-4 xl:mb-5 2xl:mb-6 line-clamp-3'>Mental health support- not a one-off area of focus</h3>
            <p className='font-light text-[#626262] text-xs 2xl:text-base line-clamp-5  mb-4 xl:mb-5'>Mental health is an essential pillar of our overall well-being, yet it has historically been overshadowed by physical health. It’s only in recent years that</p>
            <div className="flex justify-between">
                <span className='font-light text-[#898989] text-[10px] 2xl:text-sm'>Oct 20th 2024</span> 
                <Link href={`/`} className='underline font-medium text-[10px] 2xl:text-sm'>Read more</Link>
            </div>
        </div>

    </div>
  )
}
