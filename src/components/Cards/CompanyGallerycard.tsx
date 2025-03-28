import Image from 'next/image'
import React from 'react'
import { BiPlay } from 'react-icons/bi'

export default function CompanyGallerycard({ item, onClick }:CompanyGalleryCardProps) {
  return (
    <div className={`gallery-card w-full cursor-pointer`} onClick={onClick}>
        <div className="relative w-full h-40 xl:h-44 2xl:h-52 3xl:h-60">
          <Image
          src={item?.media_type=="2"?item?.media_thumbnail:item?.media_url}
          fill
          alt="company profile logo"
          className="w-full h-full rounded-xl object-cover border 2xl:rounded-2xl"
          />
          {item?.media_type=="2" && <div className="absolute bottom-[14px] 2xl:bottom-[18px] right-[14px] 2xl:right-[18px] size-9 2xl:size-11 3xl:size-12 bg-white rounded-full shadow-secondary grid place-items-center">
            <svg width="10" className='translate-x-[1px] 3xl:translate-x-[2px]' height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.73535 5.82114L0.863756 10.9432V0.699117L9.73535 5.82114Z" fill="black"/>
            </svg>

          </div>}
        </div>
        {/* <h3 className='w-full text-black text-[10px] 2xl:text-sm mt-3 2xl:mt-5 3xl:mt-6'>
            Lorem ipsum dolor sit amet consectetur adipisicing.
        </h3> */}
    </div>
  )
}
