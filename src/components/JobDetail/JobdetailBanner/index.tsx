import Image from 'next/image'
import React from 'react'
import { FaFacebookF, FaInstagram, FaStar, FaTwitter, FaYoutube } from 'react-icons/fa'
import { FiCamera } from 'react-icons/fi'
import { GoShareAndroid } from 'react-icons/go'
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import { IoHeartOutline } from 'react-icons/io5'
import { MdAccessTime } from 'react-icons/md'

export default function JobdetailBanner() {
  return (
    <div className='container'>
        <div className="flex flex-col sm:flex-row justify-between">
            <div className="flex flex-col justify-between mb-8 md:mb-0">
                <div className="block mt-5 md:mt8">
                    <h1 className='text-2xl md:text-3xl lg:text-5xl 2xl:text-6xl font-extrabold'>Senior Store Managers</h1>
                    <div className="flex gap-4 items-center mt-2 md:mt-5">
                        <p className='font-bold text-base md:text-2xl'>Swiggy</p>
                        <span className='flex items-center gap-1'><FaStar className='inline text-[#DFB300]'/><FaStar className='inline text-[#DFB300]'/><FaStar className='inline text-[#DFB300]'/><FaStar className='inline text-[#DFB300]'/><FaStar className='inline text-[#AA9393]'/> 4.0</span>
                        <p className='underline text-base'>22 reviews</p>
                    </div>
                    <div className="flex flex-wrap flex-row md:items-center mt-8 gap-3 md:gap-8 md:mt-8">
                        <span className='opacity-80 flex items-center gap-2 md:gap-3 text-sm md:text-xl'><MdAccessTime className='inline size-5 md:size-7'/> Full Time</span> 
                        <span className='opacity-80 flex items-center gap-2 md:gap-3 text-sm md:text-xl'><FiCamera className='inline size-5 md:size-7'/> 2-5 years of experience</span>
                        <span className='opacity-80 flex items-center gap-2 md:gap-3 text-sm md:text-xl'><HiOutlineCurrencyRupee className='inline size-5 md:size-7'/> 3L-6 Lacs PA</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 md:gap-8 mt-4">
                        <span className='opacity-80 text-xs md:text-lg'> Job Posted:  2 Days Ago</span> 
                        <span className='opacity-80 text-xs md:text-lg'> Openings:  10</span>
                        <span className='opacity-80 text-xs md:text-lg'> Applicants:  5</span>
                    </div>
                </div>
                <div className="flex flex-wrap mt-8 md:mt-16 md:mb-16 gap-2">
                    <button className='py-2 px-4 xl:px-6 text-xs md:text-lg xl:text-xl font-bold rounded-3xl border-[1px] bg-white border-[#E41C3B] text-[#E41C3B]'>Register to Apply</button>
                    <button className='py-2 px-4 xl:px-6 text-xs md:text-lg xl:text-xl font-bold rounded-3xl border-[1px] text-white border-[#E41C3B] bg-[#E41C3B]'>Login to Apply</button>
                    <div className="flex">
                        <button className='py-2 px-4 xl:px-6 text-xs md:text-lg xl:text-xl font-bold rounded-3xl bg-white border-[#E41C3B] text-[#E41C3B]'>Follow</button>
                        <button className='py-2 px-2 2xl:px-4 text-xs md:text-lg xl:text-xl font-bold rounded-3xl bg-white border-[#E41C3B] text-[#E41C3B]'><GoShareAndroid className='inline size-4 md:size-8'/> Share</button>
                        <button className='py-2 px-2 2xl:px-4 text-xs md:text-lg xl:text-xl font-bold rounded-3xl bg-white border-[#E41C3B] text-[#E41C3B]'><IoHeartOutline className='inline size-4 md:size-7'/> Save</button>    
                    </div>
                </div>
            </div>
            <div className="block min-h-fit max-w-[280px] mx-auto md:mx-0 2xl:max-w-[380px]  border-[#AEA3A3] border-[1px] rounded-[20px] p-[15px] lg:p-[20px] 2xl:p-[25px]">
                <div className="border-[#AEA3A3] h-[200px] border-b-[1px] grid place-items-center">
                    <div className="relative w-[208px] h-[65px] 2xl:w-[260px] 2xl:h-[81px]">
                        <Image
                            src={"/assets/banners/Swiggy-Symbol 1.png"}
                            fill
                            className='absolute'
                            alt='Swiggy-Symbol'
                            />
                    </div>
                </div>
                <div className="block py-3 md:py6">
                    <div className="flex items-center gap-3 justify-start p-2 2xl:p-4">
                        <img src="/assets/icons/home.svg" alt="home icon" />
                        <p className='text-[#4D4D4F] text-sm 2xl:text-base'>Food ordering and delivery platform</p>
                    </div>
                    <div className="flex items-center gap-3 justify-start p-2 2xl:p-4">
                        <img src="/assets/icons/group.svg" alt="home icon" />
                        <p className='text-[#4D4D4F] text-sm 2xl:text-base'>5,001-10,000 employees</p>
                    </div>
                    <div className="flex items-center gap-3 justify-start p-2 2md:p-4">
                        <img src="/assets/icons/globe.svg" alt="home icon" />
                        <p className='text-[#4D4D4F] text-sm 2xl:text-base'>Visit Swiggy Website</p>
                    </div>
                    <div className="flex justify-end items-center gap-2">
                        <FaInstagram className='size-5 2xl:size-6 text-[#B6B5B5]'/> <FaTwitter className='size-5 2xl:size-6 text-[#B6B5B5]'/> <FaYoutube className='size-5 2xl:size-6 text-[#B6B5B5]'/> <FaFacebookF className='size-5 2xl:size-6 text-[#B6B5B5]'/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
