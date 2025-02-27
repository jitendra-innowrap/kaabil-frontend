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
        <div className="container w-full flex flex-col mt-5 md:mt-8 xl:mt-14  mx-auto">
            <div className="flex justify-between mb-5 lg:mb-8 2xl:mb-[20px]">
                <div className="block">
                    <Image
                    src={"/new-assets/logos/Kaabil logo white.png"}
                    width={194}
                    height={88}
                    alt="company logo"
                    className="mb-5 md:mb-8 xl:mb-12 w-[100px] 2xl:w-[194px] 2xl:mb-[52px]"
                    />
                    <strong className='font-semibold uppercase text-sm mb-4 block 2xl:mb-5'>Connect with us</strong>
                    <div className="flex gap-2 2xl:gap-4">
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            <Image width={24} height={24} alt='' src="/new-assets/icons/fb.svg" className='inline-block w-6 h-6 text-white' />
                        </a>
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            <Image width={24} height={24} alt='' src="/new-assets/icons/x.svg" className='inline-block w-6 h-6 text-white ml-3' />
                        </a>
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            <Image width={24} height={24} alt='' src="/new-assets/icons/linkedIn.svg" className='inline-block w-6 h-6 text-white ml-3' />
                        </a>
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            <Image width={24} height={24} alt='' src="/new-assets/icons/insta.svg" className='inline-block w-6 h-6 text-white ml-3' />
                        </a>
                    </div>

                </div>
                    <div className="block">
                        <strong className='uppercase font-semibold text-sm mb-4 2xl:mb-5 text-[#E3E3E3] block'>COMPANY</strong>
                        <ul>
                            <li className='mb-4 2xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Home</li>
                            <li className='mb-4 2xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>About Us</li>
                            <li className='mb-4 2xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Resume Builder</li>
                            <li className='mb-4 2xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Career Advisor</li>
                            <li className='mb-4 2xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Mock Interviews</li>
                            <li className='mb-4 2xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Skill Center</li>
                            <li className='mb-4 2xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Blogs</li>
                        </ul>
                    </div>
                    <div className="block">
                        <strong className='uppercase font-semibold text-sm mb-4 2xl:mb-5 text-[#E3E3E3] block'>Legal</strong>
                        <ul>
                            <li className='mb-4 2xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Privacy Policy</li>
                            <li className='mb-4 2xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Terms of Use</li>
                            <li className='mb-4 2xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Cookie Policy</li>
                        </ul>
                    </div>
                    <div className="block">
                        <strong className='uppercase font-semibold text-sm mb-4 2xl:mb-5 text-[#E3E3E3] block'>Resources</strong>
                        <ul>
                            <li className='mb-4 2xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Help Center</li>
                            <li className='mb-4 2xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>FAQs</li>
                        </ul>
                    </div>
                    <div className="block">
                        <strong className='uppercase font-semibold text-sm mb-4 2xl:mb-5 text-[#E3E3E3] block'>Contact US</strong>
                        <ul>
                            <li className='mb-4 2xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3] w-[190px]'>K. C. Mahindra Education Trust Cecil Court, Near Regal Cinema, Mahakavi Bhushan Marg, Mumbai 400001.</li>
                        </ul>
                    </div>
                {/* <div className="flex gap-[37px]">
                </div> */}
                <div className="block">
                    <Image
                    src={"/new-assets/logos/mahindra logo white.png"}
                    width={182}
                    height={83}
                    alt="company logo"
                    className="mb-5 md:mb-8 w-[122px] 2xl:w-[182px] xl:mb-12 2xl:mb-[52px]"
                    />
                </div>
            </div>
            <div className="flex w-full justify-end py-4 flex-col md:flex-row gap-4 items-center border-t border-[#BDBDBD]">
                <p className='text-xs text-[#E3E3E3]'>© Copyright 2024 App. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
  )
}
