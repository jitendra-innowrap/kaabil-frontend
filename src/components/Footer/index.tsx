'use client'
import { getDeviceToken } from '@/redux/authSlice'
import { AppDispatch } from '@/redux/store'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { FaArrowRight, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { MdOutlineArrowRightAlt } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { fetchUserLocation } from '../utils'
import { setCurrentLocation } from '@/redux/userSlice'
import Link from 'next/link'

export default function Footer() {
    const dispatch = useDispatch<AppDispatch>();
const handleFetchLocation = async () => {
    try {
      const location = await fetchUserLocation();
      dispatch(setCurrentLocation(location)); // Update the user location in the Redux store
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };
  useEffect(() => {
    dispatch(getDeviceToken());
    handleFetchLocation();
  }, [dispatch]);
  return (
    <footer className='border-t-4 text-[#E3E3E3] border-[#000000] bg-[#000000]'>
        <div className="container w-full hidden md:flex flex-col mt-5 md:mt-8 xl:mt-14  mx-auto">
            <div className="flex flex-wrap justify-between mb-5 lg:mb-8 3xl:mb-[20px]">
                <div className="block">
                    <img
                    src={"/new-assets/logos/Kaabil logo white.png"}
                    width={194}
                    height={88}
                    alt="company logo"
                    className="mb-5 md:mb-8 xl:mb-12 w-[100px] 3xl:w-[194px] 3xl:mb-[52px]"
                    />
                    <strong className='font-semibold uppercase text-xs 3xl:text-sm mb-4 block 3xl:mb-5'>Connect with us</strong>
                    <div className="flex gap-2 3xl:gap-4">
                        <a href=" https://www.facebook.com/kaabilprogram" target="_blank" rel="noopener noreferrer">
                            <Image width={24} height={24} alt='' src="/new-assets/icons/fb.svg" className='inline-block w-6 h-6 text-white' />
                        </a>
                        <a href="https://x.com/kaabilprogram?t=bw-ZHBJ3k86mRIsug2oiRA&s=15" target="_blank" rel="noopener noreferrer">
                            <Image width={24} height={24} alt='' src="/new-assets/icons/x.svg" className='inline-block w-6 h-6 text-white ml-3' />
                        </a>
                        <a href="https://www.linkedin.com/company/kaabilprogram/" target="_blank" rel="noopener noreferrer">
                            <Image width={24} height={24} alt='' src="/new-assets/icons/linkedIn-Icon.svg" className='inline-block w-6 h-6 text-white ml-3' />
                        </a>
                        <a href="https://www.instagram.com/kaabilprogram/" target="_blank" rel="noopener noreferrer">
                            <Image width={24} height={24} alt='' src="/new-assets/icons/insta.svg" className='inline-block w-6 h-6 text-white ml-3' />
                        </a>
                    </div>

                </div>
                    <div className="block">
                        <strong className='uppercase font-semibold text-xs 3xl:text-sm mb-4 3xl:mb-5 text-[#E3E3E3] block'>Quick links</strong>
                        <ul>
                            <Link href={'/'} className='mb-4 3xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Home</Link>
                            <Link href={'/about-us'} className='mb-4 3xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>About Us</Link>
                            <Link href={'/companies'} className='mb-4 3xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Companies</Link>
                            {/* <Link href={'/'} className='mb-4 3xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Career Advisor</Link>
                            <Link href={'/'} className='mb-4 3xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Mock Interviews</Link>
                            <Link href={'/'} className='mb-4 3xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Skill Center</Link>
                            <Link href={'/'} className='mb-4 3xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Blogs</Link> */}
                        </ul>
                    </div>
                    <div className="block">
                        <strong className='uppercase font-semibold text-xs 3xl:text-sm mb-4 3xl:mb-5 text-[#E3E3E3] block'>Legal</strong>
                        <ul>
                            <Link href={'https://meuat.kaam.com/privacy_policy'} className='mb-4 3xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Privacy Policy</Link>
                            <Link href={'/'} className='mb-4 3xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Terms of Use</Link>
                            {/* <Link href={'/'} className='mb-4 3xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Cookie Policy</Link> */}
                        </ul>
                    </div>
                    {/* <div className="block">
                        <strong className='uppercase font-semibold text-xs 3xl:text-sm mb-4 3xl:mb-5 text-[#E3E3E3] block'>Resources</strong>
                        <ul>
                            <Link href={'/'} className='mb-4 3xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>Help Center</Link>
                            <Link href={'/'} className='mb-4 3xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3]'>FAQs</Link>
                        </ul>
                    </div> */}
                    <div className="block">
                        <strong className='uppercase font-semibold text-xs 3xl:text-sm mb-4 3xl:mb-5 text-[#E3E3E3] block'>Contact US</strong>
                        <ul>
                            <Link href={'/'} className='mb-4 3xl:mb-5 font-light text-xs 2x:text-sm cursor-pointer text-[#E3E3E3] w-[190px]'>K. C. Mahindra Education Trust Cecil Court, Near Regal Cinema, Mahakavi Bhushan Marg, Mumbai 400001.</Link>
                        </ul>
                    </div>
                {/* <div className="flex gap-[37px]">
                </div> */}
                <div className="block">
                    <img
                    src={"/new-assets/icons/black-mahindra.png"}
                    width={182}
                    height={83}
                    alt="company logo"
                    className="mb-5 md:mb-8 w-[122px] 3xl:w-[182px] xl:mb-12 3xl:mb-[52px]"
                    />
                </div>
            </div>
            <div className="flex w-full justify-end py-4 flex-col md:flex-row gap-4 items-center border-t border-[#BDBDBD]">
                <p className='text-xs text-[#E3E3E3]'>© Copyright 2025. All Rights Reserved.</p>
            </div>
        </div>
        <div className="container w-full !px-6 flex md:hidden flex-col mt-6 lg:mt-8 xl:mt-14  mx-auto">
            <div className="grid grid-cols-2 gap-3 justify-between mb-9">
                <div className="block col-span-1">
                    <img
                    src={"/new-assets/logos/Kaabil logo white.png"}
                    width={194}
                    height={88}
                    alt="company logo"
                    className="mb-5 md:mb-8 xl:mb-12 w-[100px] 3xl:w-[194px] 3xl:mb-[52px]"
                    />
                </div>
                <div className="block col-span-1">
                    <img
                    src={"/new-assets/icons/black-mahindra.png"}
                    width={182}
                    height={83}
                    alt="company logo"
                    className="mb-5 md:mb-8 w-[122px] 3xl:w-[182px] xl:mb-12 3xl:mb-[52px]"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 justify-between mb-5 lg:mb-8 3xl:mb-[20px]">
                
                    <div className="block col-span-1">
                        <strong className='uppercase font-semibold text-sm 3xl:text-sm mb-6 text-[#E3E3E3] block'>Quick Links</strong>
                        <ul className='flex flex-col gap-5'>
                            <Link href={'/'} className='mb-4 3xl:mb-5 text-sm leading-[9px] cursor-pointer text-[#E3E3E3]'>Home</Link>
                            <Link href={'/about-us'} className='mb-4 3xl:mb-5 text-sm leading-[9px] cursor-pointer text-[#E3E3E3]'>About Us</Link>
                            <Link href={'/companies'} className='mb-4 3xl:mb-5 text-sm leading-[9px] cursor-pointer text-[#E3E3E3]'>Resume Builder</Link>
                            {/* <Link href={'/'} className='mb-4 3xl:mb-5 text-sm leading-[9px] cursor-pointer text-[#E3E3E3]'>Career Advisor</Link>
                            <Link href={'/'} className='mb-4 3xl:mb-5 text-sm leading-[9px] cursor-pointer text-[#E3E3E3]'>Mock Interviews</Link>
                            <Link href={'/'} className='mb-4 3xl:mb-5 text-sm leading-[9px] cursor-pointer text-[#E3E3E3]'>Skill Center</Link>
                            <Link href={'/'} className='mb-4 3xl:mb-5 text-sm leading-[9px] cursor-pointer text-[#E3E3E3]'>Blogs</Link> */}
                        </ul>
                    </div>
                    <div className="col-span-1 flex flex-col justify-between">
                        <div className="">
                            <strong className='uppercase font-semibold text-sm 3xl:text-sm mb-6 text-[#E3E3E3] block'>Legal</strong>
                            <ul className='flex flex-col gap-5'>
                                <Link href={'https://meuat.kaam.com/privacy_policy'} className='mb-4 3xl:mb-5 text-sm leading-[9px] cursor-pointer text-[#E3E3E3]'>Privacy Policy</Link>
                                <Link href={'/'} className='mb-4 3xl:mb-5 text-sm leading-[9px] cursor-pointer text-[#E3E3E3]'>Terms of Use</Link>
                                {/* <Link href={'/'} className='mb-4 3xl:mb-5 text-sm leading-[9px] cursor-pointer text-[#E3E3E3]'>Cookie Policy</Link> */}
                            </ul>
                        </div>
                        {/* <div className="">
                            <strong className='uppercase font-semibold text-sm 3xl:text-sm mb-6 text-[#E3E3E3] block'>Resources</strong>
                            <ul className='flex flex-col gap-5'>
                                <Link href={'/'} className='mb-4 3xl:mb-5 text-sm leading-[9px] cursor-pointer text-[#E3E3E3]'>Help Center</Link>
                                <Link href={'/'} className='mb-4 3xl:mb-5 text-sm leading-[9px] cursor-pointer text-[#E3E3E3]'>FAQs</Link>
                            </ul>
                        </div> */}
                    </div>
                    <div className="block col-span-2 mt-11">
                        <strong className='uppercase font-semibold text-sm 3xl:text-sm mb-6 text-[#E3E3E3] block'>Contact US</strong>
                        <ul>
                            <li className='mb-4 3xl:mb-5 text-sm leading-[24px] cursor-pointer text-[#E3E3E3]'>K. C. Mahindra Education Trust Cecil Court, Near Regal Cinema, Mahakavi Bhushan Marg, Mumbai 400001.</li>
                        </ul>
                    </div>
                {/* <div className="flex gap-[37px]">
                </div> */}
                
            </div>
            <div className="flex w-full justify-end py-6 flex-col md:flex-row gap-4 border-t border-[#BDBDBD]">
                <p className='text-xs text-[#E3E3E3]'>© Copyright 2025. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
  )
}
