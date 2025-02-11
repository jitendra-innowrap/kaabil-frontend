import Image from 'next/image'
import React from 'react'

export default function PlayStoreAppAd() {
  return (
      <section className=" py-6 xl:py-8 2xl:py-10 container small ">
        <div className="flex relative flex-col md:flex-row-reverse md:items-end justify-between  bg-[#E41C3B] px-4 md:px-14 pt-[260px] md:pt-9 lg:px-40 lg:pt-5 2xl:pt-6 rounded-[32px]">
          <div className="block flex-1 md:">
            <h2 className='font-semibold text-white text-lg md:text-xl 2xl:text-[36px] 2xl:leading-[40px] mb-1'>Unlock your career potential 
            with the <span className='font-kalam'>Kaabil</span></h2>
            <p className='md:text-lg text-white 2xl:text-[22px] 2xl:leading-[30px] mb-2'>Download now and enjoy a seamless job-hunting experience.</p>
            <Image
                  src={"/new-assets/images/google-paly-black.png"}
                  width={215}
                  height={62}
                  alt="company logo"
                  className="mb-6 md:mb-9 lg:mb-5 2xl:mb-6 md:max-w-[100px] lg:max-w-[180px] 2xl:max-w-[215px] h-auto"
                  />
          </div>
          <div className="block w-1/2 max-w-[563px] flex-1">
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 shrink-0 md:left-[8%] top-[-50px] md:bottom-0 block h-[300px] md:h-[120%] w-[300px] lg:max-w-[563px] flex-1">
            <Image
            src={"/new-assets/images/footer-mobile.png"}
            width={429}
            height={400}
            alt="company logo"
            className="w-auto h-full"
            />
          </div>
        </div>
      </section>
  )
}
