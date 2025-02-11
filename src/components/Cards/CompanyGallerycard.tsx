import Image from 'next/image'
import React from 'react'

export default function CompanyGallerycard() {
  return (
    <div className='w-64'>
        <Image
        src={"/new-assets/images/company-gallery1.png"}
        width={250}
        height={250}
        alt="company profile logo"
        className="rounded-2xl size-64"
        />
        <h3 className='w-full text-black text-sm mt-4 md:mt-5 xl:mt-6'>
            Lorem ipsum dolor sit amet consectetur adipisicing.
        </h3>
    </div>
  )
}
