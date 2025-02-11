"use client"
import Image from 'next/image'
import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import 'swiper/css';
import GallerySlider from './Slider/GallarySlider';

export default function CompanyAboutSection() {
    const slides = [
        <Image
          className="cursor-pointer"
          src="/assets/sliders/company-1.png"
          width={320}
          height={260}
          alt="company culture"
        />,
        <Image
          className="cursor-pointer"
          src="/assets/sliders/company-2.png"
          width={320}
          height={260}
          alt="company culture"
        />,
        <Image
          className="cursor-pointer"
          src="/assets/sliders/company-3.png"
          width={320}
          height={260}
          alt="company culture"
        />,
        <Image
          className="cursor-pointer"
          src="/assets/sliders/company-4.png"
          width={320}
          height={260}
          alt="company culture"
        />,
        <Image
          className="cursor-pointer"
          src="/assets/sliders/company-1.png"
          width={320}
          height={260}
          alt="company culture"
        />,
        <Image
          className="cursor-pointer"
          src="/assets/sliders/company-2.png"
          width={320}
          height={260}
          alt="company culture"
        />,
      ];
    
  return (
    <div className='bg-[#2C2C2C] container py-8 md:py-16'>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-16">
            <div className="block">
                <strong className='font-bold text-lg md:text-3xl text-white mb-5 lg:mb-8 block'>About Swiggy</strong>
                <p className='text-base md:text-xl text-white'>Swiggy is an Indian online food ordering and delivery platform. Founded in 2014, Swiggy is headquartered in Bangalore and operates in more than 580 Indian cities, as of July 2023. Besides food delivery, the platform also provides on-demand grocery deliveries under the name Instamart, and a same-day package delivery service called Swiggy Genie.
                </p>
            </div>
            <div className="block min-h-fit">
                <div className="flex justify-end items-center h-[100px]">
                    <div className="relative w-[208px] h-[65px] 2xl:w-[260px] 2xl:h-[81px]">
                        <Image
                            src={"/assets/banners/Swiggy-Symbol 1.png"}
                            fill
                            className='absolute'
                            alt='Swiggy-Symbol'
                            />
                    </div>
                </div>
                <div className="block w-[320px] md:w-[345px] py-3 md:py6">
                    <div className="flex items-center gap-3 justify-start p-2 md:p-4">
                        <img src="/assets/icons/home-white.svg" alt="home icon" />
                        <p className='text-[#ffffff] text-base'>Food ordering and delivery platform</p>
                    </div>
                    <div className="flex items-center gap-3 justify-start p-2 md:p-4">
                        <img src="/assets/icons/group-white.svg" alt="home icon" />
                        <p className='text-[#ffffff] text-base'>5,001-10,000 employees</p>
                    </div>
                    <div className="flex items-center gap-3 justify-start p-2 md:p-4">
                        <img src="/assets/icons/globe-white.svg" alt="home icon" />
                        <p className='text-[#ffffff] text-base'>Visit Swiggy Website</p>
                    </div>
                    <div className="flex justify-end items-center gap-2">
                        <FaInstagram className='size-6 text-[#ffffff]'/> <FaTwitter className='size-6 text-[#ffffff]'/> <FaYoutube className='size-6 text-[#ffffff]'/> <FaFacebookF className='size-6 text-[#ffffff]'/>
                    </div>
                </div>
            </div>
        </div>
        <div className="block mt-8 lg:mt-12">
            <GallerySlider
            slides={slides}
            freeMode={false}
            autoplayDuration={2000}
            speed={2000}
            spaceBetween={25}
            />
        </div>
    </div>
  )
}
