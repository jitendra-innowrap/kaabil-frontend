import React, { Suspense } from 'react'
import Companies from './Companies'
import Image from 'next/image'

const Page = () => {
  return (
    <div>
      <div className="flex bg-[#f9f9f9] flex-col">
        {/* Hero Section */}
        <div className="w-full">
          <Image src='/assets/banners/trading.svg' quality={100} alt="" width={3840} height={1000} className="w-full xl:max-h-[225px] 3xl:max-h-[300px]"/>
        </div>
        <Suspense fallback={<div></div>}>
          <Companies />
        </Suspense>        
      </div>
    </div>
  )
}

export default Page