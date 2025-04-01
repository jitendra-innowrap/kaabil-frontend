'use client'
import Image from 'next/image'
import React from 'react'
import { SlGlobe } from 'react-icons/sl'
import BurgerMenu from './BurgerMenu'
import Link from 'next/link'
import { BiChevronDown } from 'react-icons/bi'
import SignInButton from './SignInButton'
import HeaderSearch from './HeaderSearch'
import { useAppSelector } from '@/redux/hooks'

export default function Header() {
const {isLoggedIn} = useAppSelector((state) => state.user);
    
  return (
    <header className='sticky top-0 bg-white z-[101]'>
        <div className='relative'>
            <div className="border-b-[1px] shadow-default flex justify-center">
                <div className='flex container mobile-header py-4 lg:py-1 3xl:py-[10px] justify-between lg:justify-start items-center'>
                    <div className="flex items-center">
                        <div className="lg:hidden mr-2">
                            <BurgerMenu />
                        </div>
                        <Link href="/" className="flex relative pr-4 md:pr-6 3xl:pr-14 items-center">
                            <Image
                                height={70}
                                width={141}
                                src="/new-assets/logos/Kaabil-logo.svg"
                                className='w-auto max-w-fit h-[40px] xl:h-[40px] 3xl:h-[70px]'
                                alt='kaabil logo'
                                />
                        </Link>
                    </div>
                    <div className="hidden lg:flex h-full w-full flex-col w-[-webkit-fill-available]">
                        <div className="flex h-full justify-between items-center">
                            <ul className="flex py-4 gap-3 xl:gap-4 3xl:gap-[30px]">
                                <li className='flex'>
                                    <Link href={"/jobs"} className='text-Grey hover:text-black font-medium hover:font-semibold text-xs 3xl:text-base relative after:w-full after:h-[3px] 3xl:after:h-1 after:rounded-[4px] hover:after:bg-red after:absolute after:bottom-[-8px] 3xl:after:bottom-[-12px] after:left-0'>
                                    Jobs
                                    </Link>
                                </li>
                                <li className='flex'>
                                    <Link href={"/companies"} className='text-Grey hover:text-black font-medium hover:font-semibold text-xs 3xl:text-base relative after:w-full after:h-[3px] 3xl:after:h-1 after:rounded-[4px] hover:after:bg-red after:absolute after:bottom-[-8px] 3xl:after:bottom-[-12px] after:left-0'>
                                    Companies
                                    </Link>
                                </li>
                                {/* <li className='relative group/menu cursor-pointer flex '>
                                    <Link href={"/"} className='text-Grey hover:text-black font-medium text-xs 3xl:text-base group-hover/menu:font-semibold relative after:w-full after:h-[3px] 3xl:after:h-1 after:rounded-[4px] group-hover/menu:after:bg-red after:absolute after:bottom-[-8px] 3xl:after:bottom-[-12px] after:left-0'>
                                        Career Tools
                                    </Link>
                                    <div className="w-full h-6  absolute top-4 left-0"></div>
                                    <BiChevronDown className='font-light 3xl:text-2xl text-Grey group-hover/menu:text-black'/>
                                    <div className="absolute z-30 hidden group-hover/menu:block duration-75 top-[40px] 3xl:top-[62px] left-0">
                                        <div className="bg-white shadow-default  rounded-xl w-[180px] 3xl:w-[288px] border border-lightGrey divide-y divide-lightGrey">
                                            <Link href='/' className='block w-full text-Grey hover:text-black py-3 3xl:py-4 font-medium hover:font-semibold text-xs 3xl:text-base px-5'>Resume Builder</Link>
                                            <Link href='/' className='block w-full text-Grey hover:text-black py-3 3xl:py-4 font-medium hover:font-semibold text-xs 3xl:text-base px-5'>Career Guide</Link>
                                            <Link href='/' className='block w-full text-Grey hover:text-black py-3 3xl:py-4 font-medium hover:font-semibold text-xs 3xl:text-base px-5'>Mock Interviews</Link>
                                        </div>
                                    </div>
                                </li> */}
                                {/* <li className='flex'>
                                    <Link href={"/"} className='text-Grey hover:text-black font-medium hover:font-semibold text-xs 3xl:text-base relative after:w-full after:h-[3px] 3xl:after:h-1 after:rounded-[4px] hover:after:bg-red after:absolute after:bottom-[-8px] 3xl:after:bottom-[-12px] after:left-0'>
                                    Skill Centre
                                    </Link>
                                </li> */}
                                <li className='flex'>
                                    <Link href={"/about-us"} className='text-Grey hover:text-black font-medium hover:font-semibold text-xs 3xl:text-base relative after:w-full after:h-[3px] 3xl:after:h-1 after:rounded-[4px] hover:after:bg-red after:absolute after:bottom-[-8px] 3xl:after:bottom-[-12px] after:left-0'>
                                    About Us
                                    </Link>
                                </li>
                            </ul>
                            <HeaderSearch/>
                            <ul className='flex gap-[10px] items-center'>
                                {/* <li className='relative group/menu text-Grey flex'>
                                    <Link href={"/"} className='relative text-black font-thin flex items-center text-xs 2xl:text-sm p-2 h-[32px] 2xl:h-[38px] border border-[#e3e3e3] rounded-lg'>
                                        <Image src={'/new-assets/icons/globe.svg'} width={19} height={19} className='mr-1' alt='globe icon'/> English
                                        <BiChevronDown className='font-medium 3xl:text-2xl text-black'/>
                                    </Link>
                                </li> */}
                                
                                {!isLoggedIn && <li className='flex mr-1 3xl:mr-3'>
                                    <Link href={"https://meuat.kaam.com/recruiter/login"} className='text-Grey hover:text-black font-medium hover:font-semibold text-xs 3xl:text-base relative after:w-full after:h-[3px] 3xl:after:h-1 after:rounded-[4px] hover:after:bg-red after:absolute after:bottom-[-8px] 3xl:after:bottom-[-12px] after:left-0'>
                                    Recruiter Login
                                    </Link>
                                </li>}
                                <li>
                                    <SignInButton/>
                                </li>
                                <li>
                                <Image
                                    height={100}
                                    width={412}
                                    quality={100}
                                    src="/new-assets/icons/mahindra-logo.svg"
                                    className='w-auto max-w-[113px] h-[22px] xl:h-[20px] 3xl:h-[31px]'
                                    alt='kaabil logo'
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="lg:hidden">
                    <ul className='flex gap-[10px] items-center'>
                        <SignInButton/>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}
