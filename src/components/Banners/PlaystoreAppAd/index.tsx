import Image from 'next/image'
import React from 'react'

export default function PlayStoreAppAd() {
  return (
      <section className=" py-6 xl:py-8 2xl:py-10 3xl:py-14 container small">
        <div className="flex relative flex-col md:flex-row-reverse md:items-end justify-between  bg-[#E41C3B] px-4 md:px-14 pt-[260px] md:pt-[23px] lg:px-36 2xl:px-40 lg:pt-5 2xl:pt-6 rounded-[32px]">
          <div className="block flex-1 2xl:-translate-x-10">
            <h2 className='font-medium text-white text-lg md:text-2xl 2xl:text-[36px] 2xl:leading-[49px] mb-1'>Unlock your career potential 
            with the <span className='font-kalam font-bold'>Kaabil</span></h2>
            <p className='md:text-sm text-white 2xl:text-[22px] 2xl:leading-[30px] mb-2 max-w-[452px]'>Download now and enjoy a seamless job-hunting experience.</p>
            <Image
                  src={"/new-assets/images/google-paly-black.png"}
                  width={215}
                  height={62}
                  alt="company logo"
                  className="mb-6 md:mb-9 lg:mb-5 2xl:mb-6 -translate-x-4 md:max-w-[100px] lg:max-w-[150px] 2xl:max-w-[215px] h-auto"
                  />
          </div>
          <div className="block w-1/2 max-w-[563px] flex-1">
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:top-[-65px] xl:translate-x-10 2xl:translate-x-0 3xl:translate-x-8 shrink-0 md:left-[8%] top-[-50px] md:bottom-0 block h-[300px] md:h-[120%] w-[300px] md:w-[328px] flex-1 xl:w-[327.2px] 2xl:w-[460px] 2xl:top-[-90px]">
            <Image
            src={"/new-assets/images/footer-mobile.png"}
            width={1716}
            height={1600}
            quality={100}
            alt="company logo"
            className="w-auto h-full md:w-[328px] 2xl:w-[460px] md:h-auto"
            />
          </div>
        </div>
      </section>
  )
}
