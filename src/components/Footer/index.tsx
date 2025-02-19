'use client'
import { getDeviceToken } from '@/redux/authSlice'
import { AppDispatch } from '@/redux/store'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { FaArrowRight, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { MdOutlineArrowRightAlt } from 'react-icons/md'
import { useDispatch } from 'react-redux'

export default function Footer() {
    const dispatch = useDispatch<AppDispatch>();
//   const { deviceId, secret, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getDeviceToken());
  }, [dispatch]);
  return (
    <footer className='border-t-4 text-[#E3E3E3] border-[#000000] bg-[#000000]'>
        <div className="container small w-full flex flex-col mt-5 md:mt-8 xl:mt-14 2xl:mt-16  mx-auto">
            <div className="grid lg:gap-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8 md:mt-10 xl:mt-16 mb-8 md:mb-10 xl:mb-16">
                <div className="block">
                    <Image
                    src={"/new-assets/images/logo-white.png"}
                    width={182}
                    height={83}
                    alt="company logo"
                    className=""
                    />
                </div>
                <div className="block">
                    <strong className='font-semibold text-sm mb-4 block'>For Women</strong>
                    <ul>
                        <li className='mb-3 font-medium text-sm'>Search Jobs</li>
                        <li className='mb-3 font-medium text-sm'>Find Employers</li>
                        <li className='mb-3 font-medium text-sm'>Join Community</li>
                        <li className='mb-3 font-medium text-sm'>Skill Training Courses</li>
                        <li className='mb-3 font-medium text-sm'>Stories & Inspiration</li>
                        <li className='mb-3 font-medium text-sm'>Women Job Seekers Login</li>
                    </ul>
                </div>
                <div className="block">
                    <strong className='font-semibold text-sm mb-4 block'>For Employers</strong>
                    <ul>
                        <li className='mb-3 font-medium text-sm'>Employers Resources</li>
                        <li className='mb-3 font-medium text-sm'>Hiring Talents</li>
                        <li className='mb-3 font-medium text-sm'>Manage Jobs</li>
                        <li className='mb-3 font-medium text-sm'>Employer Login</li>
                    </ul>
                </div>
                <div className="block">
                    <strong className='font-semibold text-sm mb-4 block'>Resources</strong>
                    <ul>
                        <li className='mb-3 font-medium text-sm'>Blogs</li>
                        <li className='mb-3 font-medium text-sm'>Stories</li>
                        <li className='mb-3 font-medium text-sm'>Videos</li>
                        <li className='mb-3 font-medium text-sm'>Podcasts</li>
                        <li className='mb-3 font-medium text-sm'>Events</li>
                        <li className='mb-3 font-medium text-sm'>Join a community</li>
                    </ul>
                </div>
                <div className="block">
                    <strong className='font-semibold text-sm mb-4 block'>Trending</strong>
                    <ul>
                        <li className='mb-3 font-medium text-sm'>Sales & Marketing Jobs</li>
                        <li className='mb-3 font-medium text-sm'>Administration Jobs</li>
                        <li className='mb-3 font-medium text-sm'>Retail Jobs</li>
                        <li className='mb-3 font-medium text-sm'>Accounting Jobs</li>
                        <li className='mb-3 font-medium text-sm'>Manufacturing Jobs</li>
                        <li className='mb-3 font-medium text-sm'>Transport & Shipping Jobs</li>
                    </ul>
                </div>
                <div className="block">
                    <strong className='font-semibold text-sm mb-4 block'>Legal</strong>
                    <ul>
                        <li className='mb-3 font-medium text-sm'>Terms of Use</li>
                        <li className='mb-3 font-medium text-sm'>Privacy Policy</li>
                        <li className='mb-3 font-medium text-sm'>Disclaimers</li>
                        <li className='mb-3 font-medium text-sm'>Cookies Policy</li>
                    </ul>
                </div>
            </div>
            <div className="flex w-full justify-end py-4 flex-col md:flex-row gap-4 items-center border-t border-[#BDBDBD]">
                <p className='text-xs text-[#E3E3E3]'>© Copyright 2024 App. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
  )
}
