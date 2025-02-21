import Image from 'next/image'
import React from 'react'
import { BiPlay } from 'react-icons/bi'

export default function CompanyGallerycard({ item, onClick }:CompanyGalleryCardProps) {
  return (
    <div className={`w-64 ${item?.media_type=="2"?"cursor-pointer":""}`} onClick={onClick}>
        <div className="relative">
          <Image
          src={item?.media_type=="2"?item?.media_thumbnail:item?.media_url}
          width={250}
          height={250}
          alt="company profile logo"
          className="rounded-2xl size-64"
          />
        {item?.media_type=="2" && <div className="absolute bottom-2 right-2 size-9 2xl:size-11 bg-white rounded-full shadow-secondary grid place-items-center">
          <BiPlay/>
        </div>}
        </div>
        <h3 className='w-full text-black text-sm mt-4 md:mt-5 xl:mt-6'>
            Lorem ipsum dolor sit amet consectetur adipisicing.
        </h3>
    </div>
  )
}
